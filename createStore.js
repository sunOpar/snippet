function createStore(reducer,initialState){
  let state = initialState;
  function dispatch(action){
    state = reducer(state, action)
  }
  return {
    dispatch,
    getState:()=> state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

const store = createStore(todos,['Use Redux'])

store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})

const state = store.getState()
console.log(state) // [ 'Use Redux', 'Read the docs' ]