import React, { useEffect, useRef } from 'react'
import styled, { css, keyframes } from 'styled-components'

const BounceAnimation = keyframes`
  0% { width: 90px; height: 90px; }
  50% { width: 95px; height: 95px; }
  100% { width: 90px; height: 90px; }
`

const animation = props => {
  if (props.animate) {
    return css`
      ${BounceAnimation} 0.5s linear;
    `
  }
}

const StyledTile = styled.div`
  border-radius: 4px;
  width: 90px;
  height: 90px;
  margin: 10px 0 0 10px;
  color: white;
  font-weight: bold;
  font-size: ${ props => {
    switch (props.score) {
      case 128:
      case 256:
      case 512:
        return "40px"
      case 1024:
      case 2048:
        return "35px"
      case "higher":
        return "30px"
      default:
        return "45px"
    }
  }};
  animation: ${animation};
  text-align: center;
  line-height: 100px;
  background: ${ props => {
    switch (props.score) {
      case 2:
        return "#485d68"
      case 4:
        return "#2ca796"
      case 8:
        return "#8e4c0c"
      case 16:
        return "#ac1d7f"
      case 32:
        return "#ffc605"
      case 64:
        return "#009dcd"
      case 128:
        return "#007541"
      case 256:
        return "#ff5500"
      case 512:
        return "#bfcc09"
      case 1024:
        return "#003669"
      case 2048:
      case "higher":
        return "#f42c59"
      default:
        return "rgba(255,255,255,0.35)"
    }
  }}
`

function Tile(props) {
  const score = props.score
  const prevScore = usePrevious(score)
    
  return (
    <StyledTile score={score} animate={ prevScore !== score && score !== 0}>{ score !== 0 ? score : ""}</StyledTile>
  )

  function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }
}

export default Tile