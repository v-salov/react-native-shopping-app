import {CHANGE_ID, CREATE_PRODUCT, ProductType, ThunkType} from '../types'
import idGenerator from '../../core/idGenerator'

export const createProduct = (product: ProductType): ThunkType => async dispatch => {

  dispatch({
    type: CREATE_PRODUCT,
    payload: product
  })
}

export const changeId = (id: string | any): ThunkType => async dispatch => {
  dispatch({
    type: CHANGE_ID,
    payload: id
  })
}
