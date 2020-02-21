import * as FileSystem from "expo-file-system"
import {
  CREATE_CARD,
  REMOVE_CARD,
  EDIT_CARD
} from "../types"


export const createCard = card => dispatch => {
  dispatch({
    type: CREATE_CARD,
    payload: card
  })
}

export const editCard = card => dispatch => {
  dispatch({
    type: EDIT_CARD,
    payload: card
  })
}

export const removeCard = id => dispatch => {
  dispatch({
    type: REMOVE_CARD,
    payload: id
  })
}


