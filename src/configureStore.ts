import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/index'
import rootSaga from './sagas/index'

export default function configureStore (initialState?) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(createSagaMiddleware(rootSaga)),
    (<any>window).devToolsExtension
      ? (<any>window).devToolsExtension({actionsBlacklist: ['GAME_LOOP_TICK']}) // TODO: typecheck this
      : (f) => f
  ))

  return store
}
