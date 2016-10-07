import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './configureStore'
import { actionTypes, userInputTypes } from './constants'
import App from './components/App'

const store = configureStore()

const keyCodeToInputType = {
  70: userInputTypes.LEFT, // F
  37: userInputTypes.LEFT, // left arrow

  74: userInputTypes.RIGHT, // J
  39: userInputTypes.RIGHT, // right arrow

  32: userInputTypes.SELECT, // space
  27: userInputTypes.BACK // escape
}

window.onkeydown = (e) => {
  const input = keyCodeToInputType[e.keyCode]

  if (input) {
    e.preventDefault()
    store.dispatch({type: actionTypes.USER_INPUT_START, payload: input})
  }
}

window.onkeyup = (e) => {
  const input = keyCodeToInputType[e.keyCode]

  if (input) {
    e.preventDefault()
    store.dispatch({type: actionTypes.USER_INPUT_END, payload: input})
  }
}

// const env = process.env.NODE_ENV
// console.log('env = ' + env)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
