import * as React from 'react'
import { connect } from 'react-redux'

import { GameState } from '../types/model'
import renderStateToString from '../renderStateToString'

class App extends React.Component<{gameState: GameState}, {}> {
  render () {
    const { gameState } = this.props

    return (
      <div>
        <pre>{JSON.stringify(gameState, null, 4)}</pre>
        <pre>{renderStateToString(gameState)}</pre>
      </div>
    )
  }
}

const mapStateToProps = (state: GameState) => ({gameState: state})

export default connect(
  mapStateToProps
)(App)
