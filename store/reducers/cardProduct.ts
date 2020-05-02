import { cardProducts } from '../../data'
import {
  ADD_PRODUCT_TO_CARD,
  REMOVE_PRODUCT_FROM_CARD,
  EDIT_PRODUCT_IN_CARD,
  REMOVE_CARD_PRODUCT_BY_ID, CardProductType, ActionTypes
} from '../types'

export type InitialStateType = {
  cardProducts: Array<CardProductType>,
  loading: boolean
}

const initialState: InitialStateType = {
  cardProducts,
  loading: false
}

export const cardProductReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CARD:
      return {
        ...state,
        cardProducts: [...state.cardProducts, action.payload]
      }
    case EDIT_PRODUCT_IN_CARD:
      return {
        ...state,
        cardProducts: state.cardProducts.map(cp => {
          if (cp.id === action.payload.id) {
            cp = action.payload
          }
          return cp
        })
      }

    case REMOVE_PRODUCT_FROM_CARD:
      return {
        ...state,
        cardProducts: state.cardProducts.filter(cp => cp.id !== action.payload)
      }

    case REMOVE_CARD_PRODUCT_BY_ID:
      return {
        ...state,
        cardProducts: state.cardProducts.filter(
          cp => cp.idCard !== action.payload
        )
      }

    default:
      return state
  }
}
