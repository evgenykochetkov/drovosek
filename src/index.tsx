import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {Button, ButtonType} from './components/Button'

import configureStore from './configureStore'
import { userInputTypes } from './constants'
import { UserInput, UserInputAction } from './types'
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
  const input: UserInput = keyCodeToInputType[e.keyCode]

  if (input) {
    e.preventDefault()
    store.dispatch({type: 'USER_INPUT_START', payload: input} as UserInputAction)
  }
}

window.onkeyup = (e) => {
  const input: UserInput = keyCodeToInputType[e.keyCode]

  if (input) {
    e.preventDefault()
    store.dispatch({type: 'USER_INPUT_END', payload: input} as UserInputAction)
  }
}

render(
  <Provider store={store}>
    <App />
    <Button
        className={ styles.deleteButton }
        buttonType={ButtonType.primary}
        onClick={ this._onDelete }
    />
  </Provider>,
  document.getElementById('app')
)
