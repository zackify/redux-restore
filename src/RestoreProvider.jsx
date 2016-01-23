import React from 'react-native'
import { Provider } from 'react-redux'
import restore from './restore'

class RestoreProvider extends React.Component {
  constructor() {
    super()
    this.state = {loaded: false}
  }

  componentWillMount() {
    restore(this.props.store)
    .then(() => this.setState({ loaded: true }))
  }

  render() {
    if(this.state.loaded == false) return this.props.onLoad || null
    return (
      <Provider store={this.props.store}>
        {this.props.children}
      </Provider>
    )
  }
}

module.exports = RestoreProvider