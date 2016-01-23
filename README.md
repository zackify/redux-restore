##redux-restore

This is a simple wrapper around async storage that saves your store data to `AsyncStorage` in react native. Works with Android and iOS! Tested on `0.18`

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

Use this instead of the usual `Provider` from redux. When you load the app, it will dispatch from storage with the current state, if there is any.

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

###Add an action to your reducer

```js
case 'authentication':
  delete action.type
  return Immutable.Map(action)
```

Create a new case with the name of your reducer. This will be called with all of the stored state.

That's it! You're all set!

###Conclusion

This library is one of the nicest AsyncStorage wrappers I've seen. The only problem I see is the way the state is restored. I think the `RestoreProvider` component could be done better.