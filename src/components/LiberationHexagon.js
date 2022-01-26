import { useRef, useState } from "react"

import Hexagon from "./konva/Hexagon"
import { Group, Text } from "react-konva"

const LiberationHexagon = (props) => {
  const {
    x,
    y,
    fill,
    width,
    title,
    description,
    stroke,
    fontSize,
    rotation,
    setActiveHexagon,
  } = props

  const textRef = useRef(null)
  const [strokeWidth, setStrokeWidth] = useState(0)

  return (
    <Group
      onMouseOver={(e) => {
        const container = e.target.getStage().container()
        container.style.cursor = "pointer"
        setStrokeWidth(3)
        if (setActiveHexagon) {
          setActiveHexagon(textRef)
        }
      }}
      onMouseOut={(e) => {
        const container = e.target.getStage().container()
        container.style.cursor = "default"
        setStrokeWidth(0)
        if (setActiveHexagon) {
          setActiveHexagon(null)
        }
      }}
      onClick={(e) => {
        if (window !== window.top) {
          //window.top.location.href("https://connected.wildflowerschools.org/")
          window.open("https://connected.wildflowerschools.org/", "_parent")
        } else {
          window.open("https://connected.wildflowerschools.org/", "_self")
        }
      }}
    >
      <Hexagon
        // ref={el => hexRef.current = el}
        x={x}
        y={y}
        radius={width}
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
}

LiberationHexagon.defaultProps = {
  fill: "red",
  stroke: "black",
  fontSize: 25,
}

export default LiberationHexagon
