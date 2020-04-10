/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  const rowMap = new Map()
  const columnMap = new Map()
  const areaMap = new Map()
  for (let index = 0; index < board.length; index++) {
    const item = board[index]
    for (let childIndex = 0; childIndex < item.length; childIndex++) {
      const childItem = item[childIndex]
      const rowKey = `${index}-${childItem}`
      const columnKey = `${childIndex}-${childItem}`
      const areaKey = `${Math.floor((index) / 3)}-${
        Math.floor((childIndex) / 3)
      }-${childItem}`
      console.log(areaKey)
      if (childItem === '.') {
        continue
      }
      if (rowMap.has(rowKey)) {
        console.log('has')
        return false
      } else {
        rowMap.set(rowKey, 1)
      }
      if (columnMap.has(columnKey)) {
        return false
      } else {
        columnMap.set(columnKey, 1)
      }
      if (areaMap.has(areaKey)) {
        return false
      } else {
        areaMap.set(areaKey, 1)
      }
    }
  }
  return true
}

const a = [
  ['.', '.', '.', '.', '5', '.', '.', '1', '.'],
  ['.', '4', '.', '3', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '3', '.', '.', '1'],
  ['8', '.', '.', '.', '.', '.', '.', '2', '.'],
  ['.', '.', '2', '.', '7', '.', '.', '.', '.'],
  ['.', '1', '5', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '2', '.', '.', '.'],
  ['.', '2', '.', '9', '.', '.', '.', '.', '.'],
  ['.', '.', '4', '.', '.', '.', '.', '.', '.'],
]
