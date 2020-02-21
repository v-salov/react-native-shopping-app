import { createStore, combineReducers, applyMiddleware } from 'redux'
import {AsyncStorage} from 'react-native'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

import { cardReducer } from './reducers/card'
import {productReducer} from "./reducers/product";
import {cardProductReducer} from "./reducers/cardProduct";

const rootReducer = combineReducers({
  card: cardReducer,
  product: productReducer,
  cardProduct: cardProductReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor  =  persistStore(store)

export {
  store, persistor
}