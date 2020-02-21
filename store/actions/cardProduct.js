import {
  ADD_PRODUCT_TO_CARD,
  EDIT_PRODUCT_IN_CARD,
  REMOVE_PRODUCT_FROM_CARD
} from "../types"

export const addProductToCard = (product, idCard, idTemp) => dispatch => {
  if (!idTemp) {
    product = {
      ...product,
      idTemp: Math.random().toString()
    }
    dispatch({
      type: ADD_PRODUCT_TO_CARD,
      product,
      idCard
    })
  } else {
    dispatch({
      type: EDIT_PRODUCT_IN_CARD,
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
