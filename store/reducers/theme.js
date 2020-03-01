import { TOGGLE_THEME } from '../types'

const initialState = {
  isDark: true
}

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        isDark: action.payload
      }
    default:
      return state
  }
}
