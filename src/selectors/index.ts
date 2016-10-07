export const timeLeft = (state) => state.get('timeLeft')

export const isPlayerCrushed = (state) => state.get('treeChunks').first() === state.get('playerPosition')

export const treeChunks = (state) => state.get('treeChunks')
