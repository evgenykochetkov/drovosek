import * as React from "react";
import {connect} from "react-redux";

import { GameState } from '../types/model'
import renderStateToString from '../renderStateToString'
import {Button, ButtonType} from './Button'

class App extends React.Component<{gameState: GameState}, {}> {
  render () {
    const { gameState } = this.props

    return (
      <div>
        <pre>{JSON.stringify(gameState, null, 4)}</pre>
        <pre>{renderStateToString(gameState)}</pre>
        <Button buttonType={ButtonType.primary} onClick={ () => alert('hi!') }>Push me</Button>
      </div>
    )
  }
}

const mapStateToProps = (state: GameState) => ({gameState: state})

export default connect(
    mapStateToProps
)(App)
