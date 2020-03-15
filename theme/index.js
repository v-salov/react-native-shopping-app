const palette = {
  palette01: '#EBECF4',
  palette02: '#000000',
  palette03: '#ff8200',
  palette04: '#444242',
  palette05: '#4C4C4C',
  palette06: 'rgba(51,52,52,0.63)',
  palette07: 'rgba(105,105,105,0.58)',
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
  palette19: 'rgba(66,66,80,0.51)',
  palette20: '#6A6A7A',
  palette21: '#8D8D93',
  palette22: '#41414B',
}
const materialPalette = {
  palette01: '#BB86FC',
  palette02: '#E65100',
  palette03: '#6200EE',
  palette04: '#018786',
  palette05: '#121212',
  palette06: '#B00020',
  palette07: '#FFFBE6',
  palette08: '#33333C',
  palette09: '#37373F',
  palette10: '#41414A',
  palette11: '#8D8D92',
  palette12: '#00695C',
  palette13: '#004D40',
}
export const colors = {
  separatorColor: palette.palette04
}
export const themedColors = {
  background: {
    light: palette.palette01,
    dark: materialPalette.palette08
  },
  backgroundInput: {
    light: "transparent",
    dark: palette.palette19
  },
  textInput: {
    light: palette.palette06,
    dark: palette.palette21
  },

  primary: {
    light: materialPalette.palette04,
    dark: materialPalette.palette04
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
    light: palette.palette07,
    dark: materialPalette.palette08
  },
  date: {
    light: palette.palette12,
    dark: palette.palette07
  },
  button: {
    light: materialPalette.palette13,
    dark: materialPalette.palette12
  },
  buttonTextDisabled: {
    light: materialPalette.palette13,
    dark: palette.palette04
  },
  buttonDanger: {
    light: palette.palette16,
    dark: materialPalette.palette06
  },
  cardProduct: {
    light: palette.palette01,
    dark: materialPalette.palette09
  },
  border: {
    light: palette.palette14,
    dark: palette.palette14
  }


}
export const getTheme = value => {
  const mode = value ? 'dark' : 'light'
  let Theme = {}
  for (let key in themedColors) {
    Theme[key] = themedColors[key][mode]
  }
  return Theme
}
