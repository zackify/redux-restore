import { AsyncStorage } from 'react-native'

const storage = keys => {
  return store => next => action => {
    next(action)
    let state = store.getState()
    for(let item in state) {
      if(keys.includes(item)) AsyncStorage.setItem(item, JSON.stringify(state[item].toJS()))
    }
  }
}
module.exports = storage