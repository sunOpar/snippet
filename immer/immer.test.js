const immer = require('./immer')

describe('base', () => {
  let baseState
  let origBaseState

  beforeEach(() => {
    origBaseState = baseState = createBaseState()
  })

  it('should return the original without modifications', () => {
    const nextState = immer(baseState, () => {})
    expect(nextState).toBe(baseState)
  })

  it('should return the original without modifications when reading stuff', () => {
    const nextState = immer(baseState, s => {
      expect(s.aProp).toBe('hi')
      expect(s.anObject.nested).toEqual({ yummie: true })
    })
    expect(nextState).toBe(baseState)
  })

  it('should return a copy when modifying stuff', () => {
    const nextState = immer(baseState, s => {
      s.aProp = 'hello world'
    })
    expect(nextState).not.toBe(baseState)
    expect(baseState.aProp).toBe('hi')
    expect(nextState.aProp).toBe('hello world')
    // structural sharing?
    expect(nextState.nested).toBe(baseState.nested)
  })

  it('deep change bubbles up', () => {
    const nextState = immer(baseState, s => {
      s.anObject.nested.yummie = false
    })
    expect(nextState).not.toBe(baseState)
    expect(nextState.anObject).not.toBe(baseState.anObject)
    expect(baseState.anObject.nested.yummie).toBe(true)
    expect(nextState.anObject.nested.yummie).toBe(false)
    expect(nextState.anArray).toBe(baseState.anArray)
  })

  it('can add props', () => {
    const nextState = immer(baseState, s => {
      s.anObject.cookie = { tasty: true }
    })
    expect(nextState).not.toBe(baseState)
    expect(nextState.anObject).not.toBe(baseState.anObject)
    expect(nextState.anObject.nested).toBe(baseState.anObject.nested)
    expect(nextState.anObject.cookie).toEqual({ tasty: true })
  })

  it('ignores single non-modification', () => {
    const nextState = immer(baseState, s => {
      s.aProp = 'hi'
    })
    expect(nextState).toBe(baseState)
  })
  it('should support reading arrays', () => {
    const nextState = immer(baseState, s => {
      s.anArray.slice()
    })
    expect(nextState.anArray).toBe(baseState.anArray)
    expect(nextState).toBe(baseState)
  })
  it('should support changing arrays', () => {
    const nextState = immer(baseState, s => {
      s.anArray[3] = true
    })
    expect(nextState).not.toBe(baseState)
    expect(nextState.anArray).not.toBe(baseState.anArray)
    expect(nextState.anArray[3]).toEqual(true)
    console.log(nextState)
  })

  afterEach(() => {
    expect(baseState).toBe(origBaseState)
    expect(baseState).toEqual(createBaseState())
  })
})

function createBaseState() {
  return {
    anArray: [1, 2, { c: 3 }],
    aProp: 'hi',
    anObject: {
      nested: {
        yummie: true,
      },
      coffee: false,
    },
  }
}
