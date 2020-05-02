import {
  ADD_PRODUCT_TO_CARD,
  EDIT_PRODUCT_IN_CARD,
  REMOVE_PRODUCT_FROM_CARD,
  REMOVE_CARD_PRODUCT_BY_ID,
  CardProductType,
  ThunkType
} from '../types'
import idGenerator from '../../core/idGenerator'

export const editProductInCard = (
  product: { measure: string; idCard: string; price: number; count: number; idProduct: string; id: string | undefined; done: boolean }
): ThunkType => dispatch => {
  if (!product.id) {
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

export const removeProductFromCard = (id: string): ThunkType => dispatch => {
  dispatch({
    type: REMOVE_PRODUCT_FROM_CARD,
    payload: id
  })
}

export const removeCardProductById = (id: string): ThunkType => dispatch => {
  dispatch({
    type: REMOVE_CARD_PRODUCT_BY_ID,
    payload: id
  })
}
