import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

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

  const [textOffset, setTextOffset] = useState({ x: 0, y: 0 })
  const [textNode, setTextNode] = useState(null)
  useEffect(() => {
    if (textNode !== null) {
      setTextOffset({
        x: textNode.textWidth / 2,
        y: textNode.textHeight / 2,
      })
    }
  }, [x, y, textNode])
  const textRef = useCallback((node) => {
    if (node !== null) {
      setTextNode(node)
    }
  }, [])

  const [strokeWidth, setStrokeWidth] = useState(0)
  const [active, setActive] = useState(false)

  const activate = (element) => {
    if (element) {
      const container = element.getStage().container()
      container.style.cursor = "pointer"
      setStrokeWidth(3)
      setActive(true)
      if (setActiveHexagon) {
        setActiveHexagon(ref.current)
      }
    }
  }

  const deactivate = (element) => {
    if (element) {
      const container = element.getStage().container()
      container.style.cursor = "default"
      setStrokeWidth(0)
      setActive(false)
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      activate: () => activate(textNode),
      deactivate: () => deactivate(textNode),
      title: () => {
        if (textNode) {
          return textNode.attrs.title
        }
      },
      description: () => {
        if (textNode) {
          return textNode.attrs.description
        }
      },
      getTextRef: () => textNode,
    }),
    [textNode]
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
        ref={textRef}
        text={title}
        description={description}
        align="right"
        fontSize={fontSize}
        fontFamily={"Times New Roman"}
        x={x}
        offsetX={textOffset.x}
        offsetY={textOffset.y}
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
