const produce = require('./immer')

test('test { a: 1, c: {d:2} }, change a', () => {
  const baseState = { a: 1, c: { d: 2 } }
  const next = produce(baseState, draft => {
    draft.a = 2
  })
  expect(baseState.a).toBe(1)
  expect(next.a).toBe(2)
  expect(baseState.c).toBe(next.c)
})
