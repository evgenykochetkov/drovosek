import React from 'react'
import { connect } from 'react-redux'

import renderStateToString from '../renderStateToString'

const App = React.createClass({
  propTypes: {
    state: React.PropTypes.object
  },
  render () {
    const { state } = this.props

    return (
      <div>
        <pre>{JSON.stringify(state, null, 4)}</pre>
        <pre>{renderStateToString(state)}</pre>
      </div>
    )
  }
})

const mapStateToProps = (state) => ({state: state.toJS()})

export default connect(
  mapStateToProps
)(App)
