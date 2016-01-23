import { AsyncStorage } from 'react-native'

const restore = store => {
  return new Promise((resolve, reject) => {
    let promises = []
    AsyncStorage.getAllKeys()
    .then(keys => {
      for (let key of keys) {
        promises.push(
          AsyncStorage.getItem(key)
          .then(item => {
            let action = {
              type: key,
              ...JSON.parse(item)
            }
            promises.push(store.dispatch(action))
          })
        )
      }
      Promise.all(promises).then(() => resolve())
    })
  })
}
module.exports = restore