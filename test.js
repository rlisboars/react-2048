
let filteredColumn = [2,4,8,16]
for (let i = filteredColumn.length -1; i > 0 ; i--) {
    if (filteredColumn[i] === 0 && i - 1 >= 0)  {
      filteredColumn[i] = filteredColumn[i-1]
      filteredColumn.splice(i-1,1)
    }
    if (filteredColumn[i] === filteredColumn[i-1]) {
      filteredColumn[i] += filteredColumn[i-1]
      filteredColumn.splice(i-1,1)
    }
  }

  console.log(filteredColumn)