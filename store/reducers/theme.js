import {CREATE_PRODUCT, TOGGLE_THEME} from "../types";

const initialState = {
  mode: 'dark'
}

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        mode: state.mode === 'dark' ? 'light' : 'dark'
      }
    default:
      return state
  }
}
