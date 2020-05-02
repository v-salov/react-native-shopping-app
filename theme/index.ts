import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { themes, getColors } from './theme'
export type ColorsType = {
  primary: string
  background: string
  card: string
  text: string
  border: string
  backgroundInput: string
  textInput: string
  primaryBackground: string
  date: string
  buttonTextDisabled: string
  cardProduct: string
  buttonDanger: string
  [key: string]: string
}

type ThemeType = {
  dark: boolean
  colors: ColorsType
}

export function useTheme() {
  const isDark = useSelector<RootState, boolean>(state => state.theme.isDark)
  const theme = isDark ? 'dark': 'light'
  const colors = getColors(theme) as ColorsType
  return {dark: isDark, colors} as ThemeType
}
