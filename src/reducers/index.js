import { fromJS } from 'immutable'
import { actionTypes, gameStatuses, userInputTypes } from '../constants'

const initialState = fromJS({
  gameStatus: gameStatuses.TITLE_SCREEN,
  playerPosition: userInputTypes.LEFT,
  timePlayed: 0,
  timeLeft: 500,
  choppedChunksCount: 0,
  treeChunks: [0, 0, 0, 0, 0, 0, 0],
  isSwingingAxe: false // TODO: extract animations in a separate reducer
})

const shiftTreeChunks = (newChunk) => (chunks) => chunks.rest().push(newChunk)

const inc = (i) => i + 1
const dec = (i) => i - 1
const cappedIncBy = (amount, cap) => (x) => {
  const res = x + amount
  return res > cap ? cap : res
}
const incTimeLeft = cappedIncBy(2, initialState.get('timeLeft') * 2)

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_GAME:
      return state.set('gameStatus', gameStatuses.PLAYING)

    case actionTypes.PAUSE_GAME:
      return state.set('gameStatus', gameStatuses.PAUSED)

    case actionTypes.RESUME_GAME:
      return state.set('gameStatus', gameStatuses.PLAYING)

    case actionTypes.GAME_OVER:
      return state.set('gameStatus', gameStatuses.GAME_OVER)

    case actionTypes.SET_PLAYER_POSITION:
      return state.set('playerPosition', action.payload)

    case actionTypes.GAME_LOOP_TICK:
      return state
        .update('timeLeft', dec)
        .update('timePlayed', inc)

    case actionTypes.CHOP_START:
      const newTreeChunk = action.payload
      return state
        .update('treeChunks', shiftTreeChunks(newTreeChunk))
        .update('choppedChunksCount', inc)
        .set('isSwingingAxe', true) // TODO: extract animations in a separate reducer
        .update('timeLeft', incTimeLeft)

    case actionTypes.CHOP_END:
      return state.set('isSwingingAxe', false) // TODO: extract animations in a separate reducer

    case actionTypes.RESET_GAME_STATE:
      const currentGameStatus = state.get('gameStatus')
      return state
        .merge(initialState)
        .set('gameStatus', currentGameStatus)

    default:
      return state
  }
}
