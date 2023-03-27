import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

import { Circle } from "react-konva"

const LiberationCircle = forwardRef((props, ref) => {
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
  const [active, setActive] = useState(false)

  const activate = useCallback(() => {
    setCircleFill(hoverFill)
    setActive(true)
    if (setActiveCircle) {
      setActiveCircle(ref.current)
    }
  }, [ref, hoverFill, setActiveCircle])

  const deactivate = useCallback(() => {
    setCircleFill(fill)
    setActive(false)
  }, [fill])

  useImperativeHandle(
    ref,
    () => ({
      activate: activate,
      deactivate: deactivate,
      title: () => {
        if (circleRef.current) {
          return circleRef.current.attrs.title
        }
      },
      description: () => {
        if (circleRef.current) {
          return circleRef.current.attrs.description
        }
      },
    }),
    [activate, deactivate, circleRef]
  )

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
      onTap={() => {
        if (!active) {
          activate()
        }
      }}
      onMouseOver={activate}
      onMouseOut={() => {
        deactivate()
        setActiveCircle(null)
      }}
    />
  )
})

LiberationCircle.defaultProps = {
  fill: "rgba(249, 249, 249, 0.1)",
  stroke: "white",
  strokeWidth: 3,
  hoverFill: "rgba(249, 249, 249, 0.6)",
}

export default LiberationCircle
