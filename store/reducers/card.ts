import { cards } from "../../data"
import { CREATE_CARD, REMOVE_CARD, EDIT_CARD, RENAME_CARD, CardType, ActionTypes } from "../types"


export type InitialStateType = {
  cards: Array<CardType>,
  loading: boolean
}

const initialState : InitialStateType = {
  cards,
  loading: false
}

export const cardReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case CREATE_CARD:
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
      case RENAME_CARD:
      return {
        ...state,
        cards: state.cards.map(c => {
          if (c.id === action.id) {
            c.name = action.name
          }
          return c
        })
      }

    default:
      return state
  }
}
