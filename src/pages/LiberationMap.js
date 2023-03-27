import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import { Label, Layer, Stage, Tag, Text } from "react-konva"

import usePrevious from "../components/usePrevious"
import useWindowDimensions from "../components/useWindowDimensions"
import LiberationHexagon from "../components/LiberationHexagon"
import LiberationCircle from "../components/LiberationCircle"

const LiberationMap = () => {
  const subTitleTextRef = useRef(null)

  const [titleTextNode, setTitleTextNode] = useState(null)

  const [hexagonRadius, setHexagonRadius] = useState(0)
  const [circleRadius, setCircleRadius] = useState(0)
  const [, setMapWidthAndHeight] = useState(0)
  const [mapCenter, setMapCenter] = useState({ x: 0, y: 0 })
  const [activeCircle, setActiveCircle] = useState(null)
  const [activeHexagon, setActiveHexagon] = useState(null)

  const [hexagons, setHexagons] = useState([])
  const [circles, setCircles] = useState([])

  const prevActiveComponents = usePrevious({ activeCircle, activeHexagon })

  const titleTextDefault = "Liberation\nculture"
  const [titleText, setTitleText] = useState(titleTextDefault)
  const [subTitleText, setSubTitleText] = useState(null)

  const MAP_Y_OFFSET = 50
  const titleFontDefault = useMemo(() => {
    return {
      fill: "#323232",
      shadowColor: "#888",
      shadowBlur: 2,
      shadowOffset: { x: 1, y: 1 },
      shadowOpacity: 0.5,
    }
  }, [])
  const titleFontLiberationCircle = useMemo(() => {
    return {
      fill: "#181818",
      shadowColor: "",
      shadowBlur: 0,
      shadowOffset: { x: 0, y: 0 },
      shadowOpacity: 0,
    }
  }, [])
  const [titleFont, setTitleFont] = useState(titleFontDefault)
  const [titleOffset, setTitleOffset] = useState({ x: 0, y: 0 })
  const [subTitleOffset, setSubTitleOffset] = useState({ x: 0, y: 0 })
  const [mapWidth, setMapWidth] = useState(0)
  const [mapHeight, setMapHeight] = useState(0)

  const { width: windowWidth, height: windowHeight } = useWindowDimensions()

  const getHexagons = (distanceFromOrigin) => {
    return [
      {
        title: "Allyship",
        color: "#ee3a9e",
        rotation: 30,
        url: "https://connected.wildflowerschools.org/posts/4590402-allyship-how-to-integration-liberation-culture-into-your-work-at-wildflower",
        description:
          "• Create a common understanding of what we mean by liberation, liberatory leadership, Liberatory education and equity.\n• Nourish connection and community.",
      },
      {
        title: "Action",
        color: "#6c679f",
        rotation: 30,
        url: "https://connected.wildflowerschools.org/posts/4590415-action-how-to-integration-liberation-culture-into-your-work-at-wildflower",
        description:
          "• Embrace evolutionary change/growth both personally and as an organization.\n• Support teachers to bring WF's liberatory purpose to life in their schools.",
      },
      {
        title: "Awareness",
        color: "#00a0c4",
        rotation: 30,
        url: "https://connected.wildflowerschools.org/posts/4590369-liberation-building-awareness",
        description:
          "• Raise critical consciousness and self-transformation.\n• Increase cross-cultural humility and understanding.",
      },
      {
        title: "Analysis",
        color: "#008437",
        rotation: 30,
        url: "https://connected.wildflowerschools.org/posts/4590377-analysis-how-to-integrate-liberation-culture-into-your-work-at-wildflower",
        description:
          "• Create a Ways of Working that disrupt domination culture at Wildflower.\n• Apply an ABAR lens to everything we do.",
      },
      {
        title: "Accountability",
        color: "#e35351",
        rotation: 30,
        url: "https://connected.wildflowerschools.org/posts/4590389-accountability-how-to-integrate-liberation-culture-into-your-work-at-wildflower",
        description:
          "• Prioritize the wholeness of our BIPOC partners and TL's.\n• Ensure that our growth towards liberation is reflected in and across our roles, accountabilities, projects.",
      },
    ].map((item, ii) => {
      return {
        title: item.title,
        description: item.description,
        url: item.url,
        rotation: item.rotation,
        fill: item.color,
        x:
          distanceFromOrigin *
          Math.cos((Math.PI * (90 + (360 / 5) * ii)) / 180),
        y:
          distanceFromOrigin *
          Math.sin((Math.PI * (90 + (360 / 5) * ii)) / 180),
      }
    })
  }

  const getCircles = (distanceFromOrigin) => {
    return [
      {
        title: "Institutional",
        description: "• Equity centered policies & practices.",
      },
      {
        title: "Ideological",
        description:
          "• Believes in the freedom and equality of the individual.\n• Belief in the freedom of all individuals to reach their full potential without obstruction.",
      },
      {
        title: "Internal",
        description:
          "• Recognizing identity and difference.\n• Recognizing and owning our privilege and disadvantage.",
      },
      {
        title: "Interpersonal",
        description:
          "• Community agreements.\n• Alliances with constructive listening.",
      },
    ].map((item, ii) => {
      return {
        title: item.title,
        description: item.description,
        x:
          distanceFromOrigin *
          Math.cos((Math.PI * (90 + (360 / 4) * ii)) / 180),
        y:
          distanceFromOrigin *
          Math.sin((Math.PI * (90 + (360 / 4) * ii)) / 180),
      }
    })
  }

  useEffect(() => {
    if (windowWidth < 780) {
      setMapWidth(windowWidth)
    } else {
      setMapWidth(Math.floor(windowWidth * 0.75))
    }
    setMapHeight(windowHeight)
  }, [windowWidth, windowHeight])

  useEffect(() => {
    if (mapWidth && mapHeight) {
      const hexagonDistanceFromOrigin = Math.min(
        Math.floor(mapHeight / 4),
        Math.floor(mapWidth / 3.5)
      )
      setHexagons(getHexagons(hexagonDistanceFromOrigin))

      const circleDistanceFromOrigin = Math.min(
        Math.floor(mapHeight / 5.5),
        Math.floor(mapWidth / 4.5)
      )
      setCircles(getCircles(circleDistanceFromOrigin))

      const _hexagonRadius = Math.min(
        Math.floor(mapHeight / 8),
        Math.floor(mapWidth / 7)
      )
      setHexagonRadius(_hexagonRadius)
      const _circleRadius = Math.min(
        Math.floor(mapHeight / 5),
        Math.floor(mapWidth / 4)
      )
      setCircleRadius(_circleRadius)

      const distanceFromOriginToFurthestHexPoint =
        hexagonDistanceFromOrigin * 2 + _hexagonRadius * 2
      const distanceFromOriginToFurthestCirclePoint =
        circleDistanceFromOrigin * 2 + _circleRadius * 2

      const _mapWidthAndHeight = Math.max(
        distanceFromOriginToFurthestHexPoint,
        distanceFromOriginToFurthestCirclePoint
      )

      setMapWidthAndHeight(_mapWidthAndHeight)
      setMapCenter({
        x: Math.floor(windowWidth / 2),
        y: _mapWidthAndHeight / 2 + MAP_Y_OFFSET,
      })
    }
  }, [windowWidth, mapWidth, mapHeight])

  useEffect(() => {
    if (activeCircle) {
      if (activeHexagon) {
        activeHexagon.deactivate()
        setActiveHexagon(null)
      }

      if (
        prevActiveComponents.activeCircle &&
        prevActiveComponents.activeCircle !== activeCircle
      ) {
        prevActiveComponents.activeCircle.deactivate()
      }

      setTitleFont(titleFontLiberationCircle)
      setTitleText(activeCircle.title())
      setSubTitleText(activeCircle.description())
    } else if (activeHexagon) {
      if (activeCircle) {
        activeCircle.deactivate()
        setActiveCircle(null)
      }

      if (
        prevActiveComponents.activeHexagon &&
        prevActiveComponents.activeHexagon !== activeHexagon
      ) {
        prevActiveComponents.activeHexagon.deactivate()
      }

      setTitleFont(titleFontLiberationCircle)
      setTitleText(activeHexagon.title())
      setSubTitleText(activeHexagon.description())
    } else {
      setTitleFont(titleFontDefault)
      setTitleText(titleTextDefault)
      setSubTitleText(null)
    }
  }, [
    activeCircle,
    activeHexagon,
    titleFontDefault,
    titleFontLiberationCircle,
    prevActiveComponents,
  ])

  useEffect(() => {
    if (titleTextNode !== null) {
      setTitleOffset({
        x: titleTextNode.textWidth / 2,
        y: titleTextNode.textHeight / 2,
      })
    }
  }, [mapWidth, titleTextNode, titleText, titleFont])
  const titleTextRef = useCallback((node) => {
    if (node !== null) {
      setTitleTextNode(node)
    }
  }, [])

  useEffect(() => {
    if (subTitleTextRef.current) {
      setSubTitleOffset({
        x: subTitleTextRef.current.attrs.width / 2,
        y: subTitleTextRef.current.textHeight / 2,
      })
    } else {
      setSubTitleOffset({ x: 0, y: 0 })
    }
  }, [subTitleText])

  return (
    <>
      <Stage width={windowWidth} height={windowHeight}>
        <Layer>
          {circles.map((item, index) => {
            return (
              <LiberationCircle
                ref={createRef()}
                key={index}
                x={mapCenter.x + item.x}
                y={mapCenter.y + item.y}
                fill={item.fill}
                title={item.title}
                description={item.description}
                radius={circleRadius}
                setActiveCircle={setActiveCircle}
              />
            )
          })}
        </Layer>
        <Layer>
          {hexagons.map((item, index) => {
            return (
              <LiberationHexagon
                ref={createRef()}
                key={index}
                x={mapCenter.x + item.x}
                y={mapCenter.y + item.y}
                radius={hexagonRadius}
                url={item.url}
                fill={item.fill}
                title={item.title}
                description={item.description}
                fontSize={Math.min((22 * mapWidth) / 700, 24)}
                rotation={item.rotation}
                setActiveHexagon={setActiveHexagon}
              />
            )
          })}
        </Layer>
        <Layer>
          <Text
            ref={titleTextRef}
            x={mapCenter.x}
            y={mapCenter.y}
            fontSize={Math.min((35 * mapWidth) / 800, 35)}
            fontStyle={"bold"}
            fontFamily={"Helvetica Neue Light"}
            fill={titleFont.fill}
            shadowColor={titleFont.shadowColor}
            shadowBlur={titleFont.shadowBlur}
            shadowOffset={titleFont.shadowOffset}
            shadowOpacity={titleFont.shadowOpacity}
            offsetX={titleOffset.x}
            offsetY={titleOffset.y}
            align={"center"}
            text={titleText}
          />
          <Label
            x={mapCenter.x}
            y={mapCenter.y + circleRadius * 2 + 10}
            offsetX={subTitleOffset.x}
            offsetY={subTitleOffset.y}
            visible={subTitleText != null}
          >
            <Tag fill={"#FFFFFFDD"} stroke={"#EEE"} />
            <Text
              ref={subTitleTextRef}
              text={subTitleText}
              width={mapWidth / 1.5}
              fontSize={Math.min((18 * mapWidth) / 800, 18)}
              fontFamily={"Helvetica Neue Light"}
              padding={10}
              align={"center"}
            />
          </Label>
        </Layer>
      </Stage>
      <div
        style={{
          right: 0,
          bottom: 0,
          position: "absolute",
          fontSize: "10px",
          background: "white",
        }}
      >
        <a
          href="https://www.knowthyselfinc.net/"
          target="_blank"
          rel="noreferrer"
        >
          Liberation Culture map created by Koren Clark
        </a>
      </div>
    </>
  )
}

export default LiberationMap
