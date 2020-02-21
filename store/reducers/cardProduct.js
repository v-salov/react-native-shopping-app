import {cardProducts} from '../../data'
import {
  ADD_PRODUCT_TO_CARD,
  REMOVE_PRODUCT_FROM_CARD,
  EDIT_PRODUCT_IN_CARD
} from "../types"

const initialState = {
  cardProducts,
  loading: false
}

export const cardProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CARD:
      return {
        ...state,
        cards: state.cards.map(card => {
          if (card.id === action.idCard) {
            card.cardProducts = [...card.cardProducts, action.product]
          }
          return card
        })
      }
      case EDIT_PRODUCT_IN_CARD:
      return {
        ...state,
        cards: state.cards.map(card => {
          if (card.id === action.idCard) {
            card.cardProducts = card.cardProducts.map(p => {
              if (p.idTemp === action.idTemp) {
                p = action.product
                p.idTemp = action.idTemp
              }
              return p
            })
          }
          return card
        })
      }
    case REMOVE_PRODUCT_FROM_CARD:
      return {
        ...state,
        cards: state.cards.map(card => {
          if (card.id === action.idCard) {
            card.cardProducts = card.cardProducts.filter(
              p => p.idTemp !== action.idTemp
            )
          }
          return card
        })
      }
    default:
      return state
  }
}
