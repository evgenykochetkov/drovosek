import { gameStatuses } from './constants'

const treeChunkRepresentation = {
  '-1': ' --=||    ',
  '0': '    ||    ',
  '1': '    ||=-- '
}

const playerPositionRepresentation = {
  '-1': {
    true: ' O- ||    ',
    false: ' O/ ||    '
  },
  '1': {
    true: '    || -O ',
    false: '    || \\O '
  }
}

export default function (state) {
  const {
    gameStatus,
    treeChunks,
    playerPosition,
    timeLeft,
    choppedChunksCount,
    isSwingingAxe
  } = state

  const treeRepresentation = treeChunks
    .map((ch) => treeChunkRepresentation[ch])
    .reverse()
    .join('\n')

  const playerRepresentation = playerPositionRepresentation[playerPosition][isSwingingAxe]

  const score = 'score: ' + choppedChunksCount

  const timeLeftRepresentation = 'countdown: ' + timeLeft

  let message
  if (gameStatus === gameStatuses.TITLE_SCREEN) {
    message = 'press SPACE to start'
  } else if (gameStatus === gameStatuses.GAME_OVER) {
    message = 'GAME OVER\npress SPACE to restart'
  } else if (gameStatus === gameStatuses.PAUSED) {
    message = 'PAUSED\npress any key to resume'
  }

  return [
    score,
    timeLeftRepresentation,
    '',
    treeRepresentation,
    playerRepresentation,
    '',
    message
  ].join('\n')
}
