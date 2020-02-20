import {CREATE_PRODUCT, LOAD_PRODUCTS} from '../types'
import { getAsyncProducts, getAsyncCategories, getAsyncMeasures} from '../../data'


  export const loadProducts = () => async dispatch => {
  const categories = await getAsyncCategories()
  const measures = await getAsyncMeasures()
  const products = await getAsyncProducts()
  dispatch({
    type: LOAD_PRODUCTS,
    payload: products,
    categories,
    measures
  })
}


export const createProduct = (product) => async dispatch => {
  product.id = Math.random()
  dispatch({
    type: CREATE_PRODUCT,
    payload: product,
  })
}
