import * as React from "react"

import { RegularPolygon } from 'react-konva'

const Pentagon = (props) => {

    const { x, y, radius, fill, stroke, strokeWidth } = props

    return (
        <RegularPolygon
            x={x}
            y={y}
            radius={radius}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            sides={5}
        />
    )
}

Pentagon.defaultProps = {
    fill: 'red',
    stroke: 'black',
    strokeWidth: 0

}

export default Pentagon