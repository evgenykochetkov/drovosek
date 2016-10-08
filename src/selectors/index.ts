import { GameState } from '../types/model' 

export const timeLeft = (state: GameState) => state.timeLeft

export const isPlayerCrushed = (state: GameState) => state.treeChunks.first() === state.playerPosition

export const treeChunks = (state: GameState) => state.treeChunks
