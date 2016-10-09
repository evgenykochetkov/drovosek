import { call, put, take, race, select } from 'redux-saga/effects'

import { COUNTDOWN_RATE_MS } from '../constants'
import * as selectors from '../selectors'
import { GameAction, SagaSignal } from '../types'

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function * gameOverOnTimeoutSaga () {
  while (yield take(['START_GAME', 'RESUME_GAME'] as SagaSignal[])) {
    while (true) {
      const {
        shouldBreak
      } = yield race({
        shouldBreak: take(['GAME_OVER', 'PAUSE_GAME'] as SagaSignal[]),
        continueAfterDelay: call(delay, COUNTDOWN_RATE_MS)
      })

      if (shouldBreak) break

      yield put({type: 'GAME_LOOP_TICK'} as GameAction)

      const timeLeft = yield select(selectors.timeLeft)

      if (timeLeft <= 0) {
        yield put({type: 'GAME_OVER'} as GameAction)
        break
      }
    }
  }
}
