import { take, put, fork } from 'redux-saga/effects'
import { userInputTypes } from '../../constants'
import { GameAction, SagaSignal } from '../../types'

import playingSaga from './playing'

export default function * startScreenSaga () {
  while (true) {
    const userInputAction = yield take('USER_INPUT_START' as SagaSignal)

    if (userInputAction.payload === userInputTypes.SELECT) {
      yield put({type: 'START_GAME'} as GameAction)
      yield fork(playingSaga)
      break
    }
  }
}
