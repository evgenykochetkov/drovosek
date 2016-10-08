import { List, Record } from 'immutable'
import { actionTypes, gameStatuses, userInputTypes } from '../constants'

// using solution for typing immutable records  
// described here: https://coderwall.com/p/vxk_tg/using-immutable-js-in-typescript
// also see https://github.com/facebook/immutable-js/issues/341#issuecomment-147940378
// or https://github.com/rangle/typed-immutable-record
const gameStateRecord = Record({
  gameStatus: gameStatuses.TITLE_SCREEN,
  playerPosition: userInputTypes.LEFT,
  timePlayed: 0,
  timeLeft: 500,
  choppedChunksCount: 0,
  treeChunks: List([0, 0, 0, 0, 0, 0, 0]),
  isSwingingAxe: false // TODO: extract animations in a separate reducer
})

export type PlayerPosition = -1 | 1
export type TreeChunk = -1 | 0 | 1
export type TreeChunks = List<TreeChunk>

export class GameState extends gameStateRecord {
  gameStatus: string;
  playerPosition: PlayerPosition;
  timePlayed: number;
  timeLeft: number;
  choppedChunksCount: number;
  treeChunks: TreeChunks;
  isSwingingAxe: boolean;
} 

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

export type GameAction = {type: 'START_GAME'}
                       | {type: 'PAUSE_GAME'}
                       | {type: 'RESUME_GAME'}
                       | {type: 'GAME_OVER'}
                       | {type: 'SET_PLAYER_POSITION', payload: PlayerPosition}
                       | {type: 'GAME_LOOP_TICK'}
                       | {type: 'CHOP_START', payload: TreeChunk}
                       | {type: 'CHOP_END'}
                       | {type: 'RESET_GAME_STATE'}

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
