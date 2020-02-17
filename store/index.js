import { createStore, combineReducers, applyMiddleware } from 'redux'
import {AsyncStorage} from 'react-native'
import thunk from 'redux-thunk'
import { cardReducer } from './reducers/card'
import {productReducer} from "./reducers/product";
import { persistStore, persistReducer } from 'redux-persist'


const rootReducer = combineReducers({
  card: cardReducer,
  product: productReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer, applyMiddleware(thunk))
let persistor  = () =>{
  console.log('restoredState', store.getState())
  return persistStore(store)
} 

export {
  store, persistor
}




// import { createStore } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// import rootReducer from './reducers'

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }