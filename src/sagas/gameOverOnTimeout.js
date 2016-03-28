import { call, put, take, race, select } from 'redux-saga/effects'

import { actionTypes, COUNTDOWN_RATE_MS } from '../constants'
import * as selectors from '../selectors'

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function * gameOverOnTimeoutSaga () {
  while (yield take([actionTypes.START_GAME, actionTypes.RESUME_GAME])) {
    while (true) {
      const {
        shouldBreak
      } = yield race({
        shouldBreak: take([actionTypes.GAME_OVER, actionTypes.PAUSE_GAME]),
        continueAfterDelay: call(delay, COUNTDOWN_RATE_MS)
      })

      if (shouldBreak) break

      yield put({type: actionTypes.GAME_LOOP_TICK})

      const timeLeft = yield select(selectors.timeLeft)

      if (timeLeft <= 0) {
        yield put({type: actionTypes.GAME_OVER})
        break
      }
    }
  }
}
