import * as React from "react";
import {connect} from "react-redux";

import { GameState } from '../types/model'
import { UserInputAction } from "../types/index";
import renderStateToString from '../renderStateToString'
import {Button, ButtonType} from './Button'

interface AppProps {
    gameState: GameState
    startGame: () => void
}

class App extends React.Component<AppProps, {}> {
  render () {
    const { gameState, startGame } = this.props

    if (gameState.gameStatus === 'TITLE_SCREEN') {
        return (
            <div>
                press space to start
                <Button buttonType={ButtonType.primary} onClick={startGame}>Start</Button>
            </div>
        )
    }

    return (
      <div>
        <pre>{JSON.stringify(gameState, null, 4)}</pre>
        <pre>{renderStateToString(gameState)}</pre>

      </div>
    )
  }
}

const mapStateToProps = (state: GameState) => ({gameState: state})

const mapDispathToProps = (dispatch) => ({
    startGame: () => dispatch({type: 'USER_INPUT_START', payload: 'SELECT'} as UserInputAction)
})

export default connect(
    mapStateToProps,
    mapDispathToProps
)(App)
