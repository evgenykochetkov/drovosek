import { fork } from 'redux-saga/effects'

import startScreenSaga from './gameStates/startScreen'
import gameOverOnTimeoutSaga from './gameOverOnTimeout'

export default function * () {
  yield [
    fork(startScreenSaga),
    fork(gameOverOnTimeoutSaga)
  ]
}
