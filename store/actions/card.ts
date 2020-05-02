import * as FileSystem from 'expo-file-system'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import {
  CREATE_CARD,
  REMOVE_CARD,
  EDIT_CARD,
  RENAME_CARD,
  ActionTypes,
  CardType, ThunkType
} from '../types'


export const renameCard = (id: string, name: string): ActionTypes => ({
  type: RENAME_CARD,
  id,
  name
})

export const createCard = (card: CardType): ThunkType => (dispatch) => {

  dispatch({
    type: CREATE_CARD,
    payload: card
  })
}

export const editCard = (card: CardType): ThunkType => (dispatch) => {
  dispatch({
    type: EDIT_CARD,
    payload: card
  })
}

export const removeCard = (id: string): ThunkType => (dispatch) => {
  dispatch({
    type: REMOVE_CARD,
    payload: id
  })
}
