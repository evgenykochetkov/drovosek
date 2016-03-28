import { take, put, fork } from 'redux-saga/effects'
import { actionTypes } from '../../constants'

import playingSaga from './playing'

export default function * pausedSaga () {
  yield take(actionTypes.USER_INPUT_START)
  yield put({type: actionTypes.RESUME_GAME})
  yield fork(playingSaga)
}
