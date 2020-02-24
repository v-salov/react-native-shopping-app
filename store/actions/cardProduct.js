import {
  ADD_PRODUCT_TO_CARD,
  EDIT_PRODUCT_IN_CARD,
  REMOVE_PRODUCT_FROM_CARD
} from "../types"

export const editProductInCard = (product) => dispatch => {
  if (!product.id) {
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
      payload: product
    })
  }
}

export const removeProductFromCard = (id) => dispatch => {
  dispatch({
    type: REMOVE_PRODUCT_FROM_CARD,
    payload: id
  })
}
