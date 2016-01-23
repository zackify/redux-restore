import { AsyncStorage } from 'react-native'

const restore = store => {
  return new Promise((resolve, reject) => {
    let promises = []
    AsyncStorage.getAllKeys()
      .then(keys => {
        for (let index in keys) {
          promises.push(
            AsyncStorage.getItem(keys[index])
            .then(item => {
              let action = {
                type: keys[index],
                ...JSON.parse(item)
              }
              promises.push(store.dispatch(action))
            })
          )
        }
        Promise.all(promises)
          .then(() => resolve())
          .catch(error => reject(error))
      })
      .catch(error => reject(error))
  })
}
module.exports = restore