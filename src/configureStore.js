import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/index'
import rootSaga from './sagas/index'

import { actionTypes } from './constants'

export default function configureStore (initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(createSagaMiddleware(rootSaga)),
    window.devToolsExtension
      ? window.devToolsExtension({actionsBlacklist: [actionTypes.GAME_LOOP_TICK]})
      : (f) => f
  ))

  return store
}
