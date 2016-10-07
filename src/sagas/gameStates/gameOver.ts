import { take, put, fork } from 'redux-saga/effects'
import { actionTypes, userInputTypes } from '../../constants'

import playingSaga from './playing'

export default function * gameOverSaga () {
  while (true) {
    const userInputAction = yield take(actionTypes.USER_INPUT_START)

    if (userInputAction.payload === userInputTypes.SELECT) {
      yield put({type: actionTypes.RESET_GAME_STATE})
      yield put({type: actionTypes.START_GAME})
      yield fork(playingSaga)
      break
    }
  }
}
