import * as FileSystem from "expo-file-system"
import {
  ADD_CARD,
  ADD_PRODUCT_TO_CARD,
  EDIT_PRODUCT_TO_CARD,
  LOAD_CARDS,
  REMOVE_CARD,
  REMOVE_PRODUCT_FROM_CARD,
  EDIT_CARD
} from "../types"

export const loadCards = () => async dispatch => {
  
}

export const addCard = card => dispatch => {
  
}

export const editCard = card => dispatch => {
  dispatch({
    type: EDIT_CARD,
    payload: card
  })
}

export const removeCard = id => dispatch => {
  dispatch({
    type: REMOVE_CARD,
    payload: id
  })
}

export const addProductToCard = (product, idCard, idTemp) => dispatch => {
  if (!idTemp) {
    product = {
      ...product, idTemp: Math.random().toString()
    }
    dispatch({
      type: ADD_PRODUCT_TO_CARD,
      product,
      idCard
    })
  } else {
    dispatch({
      type: EDIT_PRODUCT_TO_CARD,
      product,
      idCard,
      idTemp
    })
  }
 
}

export const removeProductFromCard = (idTemp, idCard) => dispatch => {
  dispatch({
    type: REMOVE_PRODUCT_FROM_CARD,
    idTemp,
    idCard
  })
}
