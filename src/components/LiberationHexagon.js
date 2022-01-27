import { forwardRef, useImperativeHandle, useRef, useState } from "react"

import Hexagon from "./konva/Hexagon"
import { Group, Text } from "react-konva"

const LiberationHexagon = forwardRef((props, ref) => {
  const {
    x,
    y,
    fill,
    radius,
    title,
    description,
    url,
    stroke,
    fontSize,
    rotation,
    setActiveHexagon,
  } = props

  const textRef = useRef(null)
  const [strokeWidth, setStrokeWidth] = useState(0)
  const [active, setActive] = useState(false)

  const activate = (element) => {
    const container = element.getStage().container()
    container.style.cursor = "pointer"
    setStrokeWidth(3)
    setActive(true)
    if (setActiveHexagon) {
      setActiveHexagon(ref.current)
    }
  }

  const deactivate = (element) => {
    const container = element.getStage().container()
    container.style.cursor = "default"
    setStrokeWidth(0)
    setActive(false)
  }

  useImperativeHandle(
    ref,
    () => ({
      activate: () => activate(textRef.current),
      deactivate: () => deactivate(textRef.current),
      title: () => {
        if (textRef.current) {
          return textRef.current.attrs.title
        }
      },
      description: () => {
        if (textRef.current) {
          return textRef.current.attrs.description
        }
      },
      getTextRef: () => textRef.current,
    }),
    [textRef]
  )

  const openLink = () => {
    if (window !== window.top) {
      window.open(url, "_parent")
    } else {
      window.open(url, "_self")
    }
  }

  return (
    <Group
      onMouseOver={(e) => activate(e.target)}
      onMouseOut={(e) => {
        deactivate(e.target)
        setActiveHexagon(null)
      }}
      onTap={(e) => {
        if (active) {
          openLink()
        } else {
          activate(e.target)
        }
      }}
      onDblTap={openLink}
      onClick={openLink}
    >
      <Hexagon
        x={x}
        y={y}
        radius={radius}
        fill={fill}
        strokeWidth={strokeWidth}
        stroke={stroke}
        rotation={rotation}
      />
      <Text
        ref={(el) => (textRef.current = el)}
        text={title}
        description={description}
        align="right"
        fontSize={fontSize}
        fontFamily={"Times New Roman"}
        x={x}
        offsetX={(() => {
          if (textRef.current) {
            return textRef.current.textWidth / 2
          } else {
            return 0
          }
        })()}
        offsetY={(() => {
          if (textRef.current) {
            return textRef.current.textHeight / 2
          } else {
            return 0
          }
        })()}
        y={y}
        fill="#FFF"
      />
    </Group>
  )
})

LiberationHexagon.defaultProps = {
  fill: "red",
  stroke: "black",
  fontSize: 25,
}

export default LiberationHexagon
