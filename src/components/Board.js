import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { randomTile, sumTiles, checkIfPlayerHadLost, randomStart } from '../utils'
import Scoreboard from './Scoreboard'
import Tile from './Tile'

const StyledBoard = styled.div`
  display: grid;
  grid-template: repeat(4, 100px) / repeat(4, 100px);
  height: 410px;
  background: #b4b6c2;
  border-radius: 4px;
`
const Message = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: black;
  text-align: center;
`

const Button = styled.button`
  display: block;
  margin: 0 auto;
  height: 50px;
  width: 300px;
  font-size: 20px;
  background-color: white;
  border: 0;
  color: #ac1d7f;
  &:hover {
    background-color: #ac1d7f;
    color: white;
  }
`

const Canvas = styled.div`
  &:focus {
    outline: none
  }
`

function Board(props) {
  const [score, setScore] = useState(-2)
  const [lastScore, setLastScore] = useState(0)

  const initialTiles = props.initialTiles
  const initialBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
  initialBoard[initialTiles.position1[0]][initialTiles.position1[1]] = initialTiles.tile1
  initialBoard[initialTiles.position2[0]][initialTiles.position2[1]] = initialTiles.tile2
  
  const [board, setBoard] = useState(initialBoard)
  const boardRef = useRef()

  useEffect(() => {
    if (score >= 0) {
      boardRef.current.focus()
    }
  })
  
  return (
      <div>
      { score < 0 && 
        <div>
          <Scoreboard score={lastScore}/>
          <Message>{ score === -1 ? 'Você perdeu!' : ''}</Message>
          <Button onClick={startGame}>{ score === -1 ? 'Reiniciar' : 'Começar' }</Button>
        </div>
      }
      { score >= 0 && 
        <Canvas ref={boardRef} tabIndex="1" onKeyDown={e => setBoard(keyPressed(e, board))}>
          <Scoreboard score={score}/>
          <StyledBoard>
            {
              board.map((tile, lineIdx) => {
                return tile.map((tileValue, colIdx) => {
                  return <Tile score={tileValue} key={`${lineIdx}${colIdx}`}/>
                })
              })
            }
          </StyledBoard>
        </Canvas>
      }
      </div>
  )

  function keyPressed(e, board) {
    let newBoard = board.slice()
    let moved = false
    let movementScore = 0
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
        for (let c = 0; c < board.length; c++) {
          let [ summedTiles, mvScore ] = sumTiles(newBoard.map(x => x[c]), e.key)
          movementScore += mvScore
          moved = summedTiles !== newBoard.map(x => x[c])
          for (let i = 0; i < summedTiles.length; i++) {
            newBoard[i][c] = summedTiles[i]
          }
          setScore(score + movementScore)
        } 
        break;
      case "ArrowRight":
      case "ArrowLeft":
        for (let l = 0; l < board.length; l++) {
          let [ summedTiles, mvScore ] = sumTiles(newBoard[l], e.key)
          movementScore += mvScore
          moved = summedTiles !== newBoard[l]
          for (let i = 0; i < summedTiles.length; i++) {
            newBoard[l][i] = summedTiles[i]
          }
          setScore(score + movementScore)
        }
        break;
      default:
        break;
    }
    
    if (moved) {
      const newTile = randomTile(newBoard)
      if (newTile.position) newBoard[newTile.position[0]][newTile.position[1]] = newTile.tile
      if (checkIfPlayerHadLost(newBoard)) {
        setLastScore(score)
        setScore(-1)
      }
    }
    return newBoard
  }

  function startGame() {
    const initialTiles = randomStart()
    const initialBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    initialBoard[initialTiles.position1[0]][initialTiles.position1[1]] = initialTiles.tile1
    initialBoard[initialTiles.position2[0]][initialTiles.position2[1]] = initialTiles.tile2
    setBoard(initialBoard)
    setScore(0)
  }
}

export default Board
