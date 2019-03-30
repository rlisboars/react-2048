import React, { useState } from 'react'
import styled from 'styled-components'

const LOCALSTORAGEKEY = "R34CT2048"

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 80px 40px;
  column-gap: 10px;
  width: 410px;
  height: 120px;
  margin: 0 auto;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
`

const Score = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  border-radius: 4px;
  background: #b4b6c2;
  color: white;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
`

const Title = styled.div`
  color: white;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  font-size: 15px;
`

const Mission = styled.div`
  color: #b4b6c2;
  font-size: 12px;
  font-weight: bold;
  grid-column-start: 1;
  grid-column-end: 3;
  text-align: center;
  line-height: 40px;
`

function Scoreboard(props) {
  
  let storedHighScore = localStorage.getItem(LOCALSTORAGEKEY)
  const score = props.score
  const [ highScore, setHighScore ] = useState(storedHighScore ? storedHighScore : 0)

  if (score > storedHighScore) {
    localStorage.setItem(LOCALSTORAGEKEY, score)
    setHighScore(score)
  }

  return (
    <StyledBoard>
      <Score>
        <Title>PONTUAÇÃO</Title>
        {props.score}
      </Score>
      <Score>
        <Title>MELHOR</Title>
        {highScore}
      </Score>
      <Mission>O seu próximo objetivo é chegar ao número {parseInt(highScore) + 4}</Mission>
    </StyledBoard>
  )

}

export default Scoreboard
