/**
 * 插入排序
 *
 */

function insert(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > current) {
      arr[j+1] = arr[j]
      j--
    }
    arr[j+ 1] = current
    console.log(arr)
  }
}

const array = [3, 1, 7, 5, 2, 9]

insert(array)

console.log(array)
