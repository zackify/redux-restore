##redux-restore

This is a simple wrapper around async storage that saves your store data to `AsyncStorage` in react native.

##Setup

###Register Middleware

Create your store with the `storage` middleware

```js
import { combineReducers, applyMiddleware, createStore } from 'redux'
import items from './items'
import authentication from './authentication' //reducer name
import { storage } from 'redux-restore'

let createStoreWithMiddleware = applyMiddleware(
  storage(['authentication']) //reducer name
)(createStore)

let reducers = combineReducers({
  items,
  authentication
})

export default createStoreWithMiddleware(reducers)
```

Pass an array with reducer names. Each one you pass will be saved to storage.

###Use RestoreProvider

Use this instead of the usual `Provider` from redux.

```js
import React from 'react-native'
import Scene from './scene'
import store from '../../reducers'
import { RestoreProvider } from 'redux-restore'

export default class App extends React.Component {
  render() {
    return (
      <RestoreProvider store={store}>
        <Scene />
      </RestoreProvider>
    );
  }
}
```

###Conclusion

This library is one of the nicest AsyncStorage wrappers I've seen. The only problem I see is the way the state is restored. I think the `RestoreProvider` component could be done better.