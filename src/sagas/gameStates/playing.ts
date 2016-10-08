import { take, put, fork, race, select, call } from 'redux-saga/effects'
import { userInputTypes } from '../../constants'
import { GameAction, SagaSignal } from '../../types'

import gameOverSaga from './gameOver'
import pausedSaga from './paused'
import * as selectors from '../../selectors'

export const generateNextTreeChunk = (existingChunks) => {
  // first chunk must be 0
  if (existingChunks.size === 0) return 0

  // at least every other chunk must be 0
  const lastChunk = existingChunks.last()
  if (lastChunk !== 0) return 0

  return (Math.random() >= 0.5) ? -1 : 1
}

export default function * playingSaga () {
  while (true) {
    // wake up on user input or game over
    const {
      userInput,
      gameOver
    } = yield race({
      userInput: take(['USER_INPUT_START', 'USER_INPUT_END'] as SagaSignal[]),
      gameOver: take('GAME_OVER' as SagaSignal)
    })

    if (gameOver) {
      yield fork(gameOverSaga)
      break
    }

    if (userInput.payload === userInputTypes.BACK) {
      yield put({type: 'PAUSE_GAME'} as GameAction)
      yield fork(pausedSaga)
      break
    }

    if (userInput.payload === userInputTypes.LEFT || userInput.payload === userInputTypes.RIGHT) {
      if (userInput.type === 'USER_INPUT_START') {
        yield put({type: 'SET_PLAYER_POSITION', payload: userInput.payload} as GameAction)
        if (yield select(selectors.isPlayerCrushed)) {
          yield put({type: 'GAME_OVER'} as GameAction)
          yield fork(gameOverSaga)
          break
        }

        const currentTreeChunks = yield select(selectors.treeChunks)
        // FIXME: 'as any' 
        const nextTreeChunk = yield call(generateNextTreeChunk as any, currentTreeChunks)
        yield put({type: 'CHOP_START', payload: nextTreeChunk} as GameAction)
        if (yield select(selectors.isPlayerCrushed)) {
          yield put({type: 'GAME_OVER'} as GameAction)
          yield fork(gameOverSaga)
          break
        }
      } else if (userInput.type === 'USER_INPUT_END') {
        yield put({type: 'CHOP_END'} as GameAction)
      }
    }
  }
}
