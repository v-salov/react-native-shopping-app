import {CHANGE_ID, CREATE_PRODUCT, LOAD_PRODUCTS} from '../types'
import idGenerator from '../../core/idGenerator'


export const createProduct = (product) => async dispatch => {
  product.id = idGenerator()
  console.log('ACTION_CREATE_PRODUCT',product)
  dispatch({
    type: CREATE_PRODUCT,
    payload: product,
  })
}

export const changeId = (id) => async dispatch => {

  console.log('changeId',id)
  dispatch({
    type: CHANGE_ID,
    payload: id,
  })
}
