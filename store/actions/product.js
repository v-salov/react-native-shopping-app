import {CREATE_PRODUCT, LOAD_PRODUCTS} from '../types'


export const createProduct = (product) => async dispatch => {
  product.id = Math.random()
  dispatch({
    type: CREATE_PRODUCT,
    payload: product,
  })
}
