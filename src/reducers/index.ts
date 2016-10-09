import { List, Record } from 'immutable'
import { gameStatuses, userInputTypes } from '../constants'

import { GameAction } from '../types'
import { GameState, TreeChunk, TreeChunks } from '../types/model'

const initialState = new GameState()

const shiftTreeChunks = (newChunk: TreeChunk) => (chunks: TreeChunks) => chunks.shift().push(newChunk)

const inc = (i: number) => i + 1
const dec = (i: number) => i - 1
const cappedIncBy = (amount: number, cap: number) => (x: number) => {
  const res = x + amount
  return res > cap ? cap : res
}

const MAX_TIME_LEFT = initialState.timeLeft * 2
const incTimeLeft = cappedIncBy(2, MAX_TIME_LEFT)

export default (state = initialState, action: GameAction) => {
  switch (action.type) {
    case 'START_GAME':
      return state.set('gameStatus', gameStatuses.PLAYING)

    case 'PAUSE_GAME':
      return state.set('gameStatus', gameStatuses.PAUSED)

    case 'RESUME_GAME':
      return state.set('gameStatus', gameStatuses.PLAYING)

    case 'GAME_OVER':
      return state.set('gameStatus', gameStatuses.GAME_OVER)

    case 'SET_PLAYER_POSITION':
      return state.set('playerPosition', action.payload)

    case 'GAME_LOOP_TICK':
      return state
        .update('timeLeft', dec)
        .update('timePlayed', inc)

    case 'CHOP_START':
      const newTreeChunk = action.payload
      return state
        .update('treeChunks', shiftTreeChunks(newTreeChunk))
        .update('choppedChunksCount', inc)
        .set('isSwingingAxe', true) // TODO: extract animations in a separate reducer
        .update('timeLeft', incTimeLeft)

    case 'CHOP_END':
      return state.set('isSwingingAxe', false) // TODO: extract animations in a separate reducer

    case 'RESET_GAME_STATE':
      const currentGameStatus = state.gameStatus
      return state
        .merge(initialState)
        .set('gameStatus', currentGameStatus)

    default:
      return state
  }
}
