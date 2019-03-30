import React, { Component } from 'react'
import styled from 'styled-components'
import Board from './components/Board'
import { randomStart } from './utils'

const initialTiles = randomStart()

const StyledBoard = styled.div`
  width: 410px;
  margin: 0 auto;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
`

class App extends Component {
  componentDidMount() {
    document.title = "React 2048"
  }
  render() {
    return (
      <StyledBoard>
        <Board initialTiles={initialTiles}/>
      </StyledBoard>
    );
  }
}

export default App;
