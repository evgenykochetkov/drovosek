import * as React from "react";
import {connect} from "react-redux";
import renderStateToString from "../renderStateToString";
import {Button, ButtonType} from "./Button";

class App extends React.Component<{state: any}, {}> {
    render() {
        const {state} = this.props

        return (
            <div>
                <pre>{JSON.stringify(state, null, 4)}</pre>
                <pre>{renderStateToString(state)}</pre>
                <Button
                    buttonType={ButtonType.primary}
                    onClick={ () => alert('Hi') }
                >Push me</Button>
            </div>
        )
    }
}

// TODO: converting Immutable state to plain JS object when passing to props is a big no-no  
const mapStateToProps = (state) => ({state: state.toJS()})

export default connect(
    mapStateToProps
)(App)
