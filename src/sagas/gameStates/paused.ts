import { take, put, fork } from 'redux-saga/effects'
import { GameAction, SagaSignal } from '../../types'

import playingSaga from './playing'

export default function * pausedSaga () {
  yield take('USER_INPUT_START' as SagaSignal)
  yield put({type: 'RESUME_GAME'} as GameAction)
  yield fork(playingSaga)
}
