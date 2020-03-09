const palette = {
  palette01: '#EBECF4',
  palette02: '#000000',
  palette03: '#ff8200',
  palette04: '#444242',
  palette05: '#4C4C4C',
  palette06: '#333434',
  palette07: '#696969',
  palette08: '#151515',
  palette09: '#222222',
  palette10: '#0F0F0F',
  palette11: '#292A2F',
  palette12: '#3E464B',
  palette13: '#3E464B',
  palette14: '#2F97DD',
  palette15: '#31A8F8',
  palette16: '#F61F4D',
  palette17: '#37966F',
  palette18: '#FFFBE6',

}
const materialPalette = {
  palette01: '#BB86FC',
  palette02: '#E65100',
  palette03: '#6200EE',
  palette04: '#018786',
  palette05: '#121212',
  palette06: '#B00020',
  palette07: '#FFFBE6'

}
export const colors = {
  separatorColor: palette.palette04
}
export const themedColors = {
  background: {
    light: materialPalette.palette07,
    dark: materialPalette.palette05
  },

  primary: {
    light: palette.palette02,
    dark: palette.palette01
  },

  primaryText: {
    light: palette.palette02,
    dark: palette.palette01
  },
  primaryBackground: {
    light: palette.palette01,
    dark: palette.palette02
  },
  separator: {
    light: palette.palette05,
    dark: palette.palette05
  },
  date: {
    light: palette.palette12,
    dark: palette.palette07
  },
  button: {
    light: palette.palette14,
    dark: palette.palette03
  },
  buttonDanger: {
    light: palette.palette16,
    dark: materialPalette.palette06
  },
  cardProduct: {
    light: palette.palette01,
    dark: palette.palette08
  },

}
export const getTheme = value => {
  const mode = value ? 'dark' : 'light'
  let Theme = {}
  for (let key in themedColors) {
    Theme[key] = themedColors[key][mode]
  }
  return Theme
}
