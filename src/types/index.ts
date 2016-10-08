import { PlayerPosition, TreeChunk } from './model'

type GameStatusTransitionActionType = 'START_GAME' | 'PAUSE_GAME' | 'RESUME_GAME' | 'GAME_OVER'

export type GameAction = {type: GameStatusTransitionActionType}
                       | {type: 'SET_PLAYER_POSITION', payload: PlayerPosition}
                       | {type: 'GAME_LOOP_TICK'}
                       | {type: 'CHOP_START', payload: TreeChunk}
                       | {type: 'CHOP_END'}
                       | {type: 'RESET_GAME_STATE'}

type UserInputActionType = 'USER_INPUT_START' | 'USER_INPUT_END'
export type UserInput = PlayerPosition | 'SELECT' | 'BACK'

export type UserInputAction = {type: UserInputActionType, payload: UserInput} // used only in sagas

export type SagaSignal = GameStatusTransitionActionType | UserInputActionType
