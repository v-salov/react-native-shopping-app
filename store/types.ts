import idGenerate from '../core/idGenerator'
import { ThunkAction } from 'redux-thunk'
import { RootState } from './index'
import { Action } from 'redux'

export const CREATE_CARD = 'CREATE_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const EDIT_CARD = 'EDIT_CARD'
export const RENAME_CARD = 'RENAME_CARD'

export const ADD_PRODUCT_TO_CARD = 'ADD_PRODUCT_TO_CARD'
export const EDIT_PRODUCT_IN_CARD = 'EDIT_PRODUCT_IN_CARD'
export const REMOVE_PRODUCT_FROM_CARD = 'REMOVE_PRODUCT_FROM_CARD'
export const REMOVE_CARD_PRODUCT_BY_ID = 'REMOVE_CARD_PRODUCT_BY_ID'

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const CHANGE_ID = 'CHANGE_ID'

export const TOGGLE_THEME = 'TOGGLE_THEME'

//types
export type CardType = {
  id: string
  name: string
  date: Date
}
export type ProductType = {
  id: string
  name: string
  category: string
  price: number
  measure: string
}
export type CategoryType = {
  id: string
  name: string
}
export type MeasureType = {
  id: string
  name: string
  fullName: string
}
export type CardProductType = {
  id: string
  idCard: string
  idProduct: string
  count: number
  price: number
  measure: string
  done: boolean
}

//ActionTypes
type CreateCardActionType = {
  type: typeof CREATE_CARD
  payload: CardType
}
type RemoveCardActionType = {
  type: typeof REMOVE_CARD
  payload: string
}
type EditCardActionType = {
  type: typeof EDIT_CARD
  payload: CardType
}
type RenameCardActionType = {
  type: typeof RENAME_CARD
  id: string
  name: string
}

type EditProductInCardActionType = {
  type: typeof ADD_PRODUCT_TO_CARD | typeof EDIT_PRODUCT_IN_CARD
  payload: CardProductType
}
type RemoveProductFromCardActionType = {
  type: typeof REMOVE_PRODUCT_FROM_CARD
  payload: string
}
type RemoveCardProductByIdActionType = {
  type: typeof REMOVE_CARD_PRODUCT_BY_ID
  payload: string
}

type CreateProductActionType = {
  type: typeof CREATE_PRODUCT
  payload: ProductType
}

type ChangeIdActionType = {
  type: typeof CHANGE_ID
  payload: string
}

export type ActionTypes =
  | CreateCardActionType
  | RemoveCardActionType
  | EditCardActionType
  | RenameCardActionType
  | RemoveProductFromCardActionType
  | RemoveCardProductByIdActionType
  | EditProductInCardActionType
  | CreateProductActionType
  | ChangeIdActionType

export type ThunkType = ThunkAction<void, RootState, unknown, ActionTypes>
