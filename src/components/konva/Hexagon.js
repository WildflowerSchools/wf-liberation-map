import * as React from "react"

import { RegularPolygon } from "react-konva"

const Hexagon = (props) => {
  const { x, y, radius, fill, stroke, strokeWidth, rotation, ...otherProps } =
    props

  return (
    <RegularPolygon
      x={x}
      y={y}
      radius={radius}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      sides={6}
      rotation={rotation}
      {...otherProps}
    />
  )
}

Hexagon.defaultProps = {
  fill: "red",
  stroke: "black",
  strokeWidth: 0,
}

export default Hexagon
