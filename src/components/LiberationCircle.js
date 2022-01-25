import { useRef, useState } from "react"

import { Circle } from "react-konva"

const LiberationCircle = (props) => {
  const {
    x,
    y,
    fill,
    hoverFill,
    radius,
    title,
    description,
    stroke,
    strokeWidth,
    setActiveCircle,
  } = props

  const circleRef = useRef(null)

  const [circleFill, setCircleFill] = useState(fill)
  const setActive = useState(false)[1]

  return (
    <Circle
      ref={circleRef}
      title={title}
      description={description}
      x={x}
      y={y}
      fill={circleFill}
      radius={radius}
      stroke={stroke}
      strokeWidth={strokeWidth}
      onMouseOver={(e) => {
        setCircleFill(hoverFill)
        setActive(true)
        if (setActiveCircle) {
          setActiveCircle(circleRef)
        }
      }}
      onMouseOut={(e) => {
        setCircleFill(fill)
        setActive(false)
        if (setActiveCircle) {
          setActiveCircle(null)
        }
      }}
    />
  )
}

LiberationCircle.defaultProps = {
  fill: "rgba(249, 249, 249, 0.1)",
  stroke: "white",
  strokeWidth: 3,
  hoverFill: "rgba(249, 249, 249, 0.6)",
}

export default LiberationCircle
