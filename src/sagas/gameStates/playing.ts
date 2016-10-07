import { take, put, fork, race, select, call } from 'redux-saga/effects'
import { actionTypes, userInputTypes } from '../../constants'

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
    // wake up on user input or game
    const {
      userInput,
      gameOver
    } = yield race({
      userInput: take([actionTypes.USER_INPUT_START, actionTypes.USER_INPUT_END]),
      gameOver: take(actionTypes.GAME_OVER)
    })

    if (gameOver) {
      yield fork(gameOverSaga)
      break
    }

    if (userInput.payload === userInputTypes.BACK) {
      yield put({type: actionTypes.PAUSE_GAME})
      yield fork(pausedSaga)
      break
    }

    if (userInput.payload === userInputTypes.LEFT || userInput.payload === userInputTypes.RIGHT) {
      if (userInput.type === actionTypes.USER_INPUT_START) {
        yield put({type: actionTypes.SET_PLAYER_POSITION, payload: userInput.payload})
        if (yield select(selectors.isPlayerCrushed)) {
          yield put({type: actionTypes.GAME_OVER})
          yield fork(gameOverSaga)
          break
        }

        const currentTreeChunks = yield select(selectors.treeChunks)
        // const nextTreeChunk = yield call(generateNextTreeChunk, currentTreeChunks)
        const nextTreeChunk = generateNextTreeChunk(currentTreeChunks) // TODO: side-effect
        yield put({type: actionTypes.CHOP_START, payload: nextTreeChunk})
        if (yield select(selectors.isPlayerCrushed)) {
          yield put({type: actionTypes.GAME_OVER})
          yield fork(gameOverSaga)
          break
        }
      } else if (userInput.type === actionTypes.USER_INPUT_END) {
        yield put({type: actionTypes.CHOP_END})
      }
    }
  }
}
