function rang(start, end) {
  let index = start
  return {
    [Symbol.iterator]: () => {
      return {
        next: () => {
          if (index < end) {
            return { value: index++, done: false }
          }
          return { value: undefined, done: true }
        },
      }
    },
  }
}

for (let i of rang(0, 3)) {
  console.log(i)
}
