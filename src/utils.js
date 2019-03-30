export function randomStart(board) {
  const randomPosition1 = [Math.floor(Math.random() * 4) + 0, Math.floor(Math.random() * 3) + 0]
  let randomPosition2 = [Math.floor(Math.random() * 4) + 0, Math.floor(Math.random() * 3) + 0]
  while (randomPosition2 === randomPosition1) {
    randomPosition2 = [Math.floor(Math.random() * 4) + 0, Math.floor(Math.random() * 3) + 0]
  }
  const randomTiles = [(Math.floor(Math.random() * 2) + 1) * 2, (Math.floor(Math.random() * 2) + 1) * 2]
  return  {
    position1: randomPosition1,
    tile1: randomTiles[0],
    position2: randomPosition2,
    tile2: randomTiles[1]
  }
}

export function randomTile(board) {
  let emptyPositions = []
  board.map((line, idxLine) => {
    return line.map((tile, idxColumn) => {
      if (tile === 0) emptyPositions.push([idxLine, idxColumn])
    })
  })
  let randomPosition = Math.floor(Math.random() * emptyPositions.length) + 0
  const randomTile = (Math.floor(Math.random() * 2) + 1) * 2

  return {
    position: emptyPositions.length > 0 ? emptyPositions[randomPosition] : false,
    tile: randomTile
  }
}

export function sumTiles(tiles, key) {
  let filteredColumn = tiles.filter(x => x !== 0)
  let movementScore = 0
  filteredColumn = key === "ArrowLeft" || key === "ArrowUp" ? filteredColumn.reverse() : filteredColumn
  for (let i = filteredColumn.length - 1; i > 0; i--) {
    if (filteredColumn[i] === 0 && i - 1 >= 0) {
      filteredColumn[i] = filteredColumn[i - 1]
      filteredColumn.splice(i - 1, 1)
    }
    if (filteredColumn[i] === filteredColumn[i - 1]) {
      filteredColumn[i] += filteredColumn[i - 1]
      movementScore += filteredColumn[i]
      filteredColumn.splice(i - 1, 1)
    }
  }
  filteredColumn.unshift(...Array(4 - filteredColumn.length).fill(0))
  filteredColumn = key === "ArrowLeft" || key === "ArrowUp" ? filteredColumn.reverse() : filteredColumn
  return [ filteredColumn, movementScore ]
}

export function checkIfPlayerHadLost(board) {
  for (let l = 0; l < board.length - 1; l++) {
    for (let c = 0; c < board.length; c++) {
      const tile = board[l][c]
      const tileBellow = board[l+1][c]
      const tileRight = c === board.length - 1 ? null : board[l][c+1]
      if (tile === 0) return false
      if (tile === tileBellow || tile === tileRight) return false
    }
  }
  return true
}
