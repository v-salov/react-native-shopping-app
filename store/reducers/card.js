import {cards, cardProducts} from '../../data'
import idGenerate from '../../core/idGenerator'
import {
  ADD_CARD,
  ADD_PRODUCT_TO_CARD,
  LOAD_CARDS,
  REMOVE_CARD,
  REMOVE_PRODUCT_FROM_CARD,
  EDIT_PRODUCT_TO_CARD,
  EDIT_CARD
} from "../types"

const initialState = {
  loading: false,
  cards,
  cardProducts
}

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CARDS:
      return {
        ...state,
        cards: action.payload,
        loading: false
      }

    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload]
      }
    case REMOVE_CARD:
      return {
        ...state,
        cards: state.cards.filter(c => {
          if (c.id !== action.payload) {
            return c
          }
        })
      }
    case EDIT_CARD:
      return {
        ...state,
        cards: state.cards.map(c => {
          if (c.id === action.payload.id) {
            c = action.payload
          }
          return c
        })
      }
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
      case EDIT_PRODUCT_TO_CARD:
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
