import { take, put, fork } from 'redux-saga/effects'
import { actionTypes, userInputTypes } from '../../constants'

import playingSaga from './playing'

export default function * startScreenSaga () {
  while (true) {
    console.log('waiting for USER_INPUT_START')
    const userInputAction = yield take(actionTypes.USER_INPUT_START)

    if (userInputAction.payload === userInputTypes.SELECT) {
      yield put({type: actionTypes.START_GAME})
      yield fork(playingSaga)
      break
    }
  }
  console.log('exiting startScreenSaga')
}
