import { List, Record } from 'immutable'

export type GameStatus = 'TITLE_SCREEN' | 'PLAYING' | 'GAME_OVER' | 'PAUSED'
export type PlayerPosition = -1 | 1 // игрок слева или справа от дерева
export type TreeChunk = PlayerPosition | 0 // сук торчит влево/вправо либо сука нет совсем
export type TreeChunks = List<TreeChunk>

// using solution for typing immutable records  
// described here: https://coderwall.com/p/vxk_tg/using-immutable-js-in-typescript
//
// also see https://github.com/facebook/immutable-js/issues/341#issuecomment-147940378
// or https://github.com/rangle/typed-immutable-record
const gameStateRecord = Record({
  gameStatus: 'TITLE_SCREEN' as GameStatus,
  playerPosition: -1 as PlayerPosition,
  timePlayed: 0,
  timeLeft: 500,
  choppedChunksCount: 0,
  treeChunks: List([0, 0, 0, 0, 0, 0, 0]),
  isSwingingAxe: false // TODO: extract animations in a separate reducer
})

export class GameState extends gameStateRecord {
  gameStatus: GameStatus;
  playerPosition: PlayerPosition;
  timePlayed: number;
  timeLeft: number;
  choppedChunksCount: number;
  treeChunks: TreeChunks;
  isSwingingAxe: boolean;
} 
