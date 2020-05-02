import { TOGGLE_THEME } from '../types'

const initialState = {
  isDark: true as boolean
}
export type InitialStateType = typeof initialState

export const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        isDark: action.payload
      }
    default:
      return state
  }
}
