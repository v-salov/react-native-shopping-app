import {
  ADD_PRODUCT_TO_CARD,
  EDIT_PRODUCT_IN_CARD,
  REMOVE_PRODUCT_FROM_CARD
} from "../types"
import idGenerator from "../../core/idGenerator"

export const editProductInCard = (product) => dispatch => {
  if (!product.id) {
    console.log(product)
    product = {
      ...product,
      id: idGenerator()
    }
    dispatch({
      type: ADD_PRODUCT_TO_CARD,
      payload: product
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
