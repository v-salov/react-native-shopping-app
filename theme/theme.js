import {ColorsType} from "./index";

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
  palette22: '#41414B'
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
  palette13: '#004D40'
}

const themedColors = {
  background: {
    light: palette.palette01,
    dark: materialPalette.palette08
  },
  backgroundInput: {
    light: 'transparent',
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

export const themes = [
  {
    dark: true,
    colors: {
      primary: '#018786',
      background: '#33333C',
      card: '#37373F',
      cardProduct: '#37373F',
      text: '#EBECF4',
      border: '#2F97DD',
      backgroundInput: 'rgba(66,66,80,0.51)',
      textInput: '#8D8D93',
      primaryBackground: '#000000',
      date: 'rgba(105,105,105,0.58)',
      button: 'rgba(51,52,52,0.63)',
      buttonTextDisabled: '#444242',
      buttonDanger: '#B00020',
      separator: '#33333C'
    }
  },
  {
    dark: false,
    colors: {
      primary: '',
      background: palette.palette01,
      card: '',
      cardProduct: '',
      text: '',
      border: '',
      backgroundInput: '',
      textInput: '',
      primaryBackground: '',
      date: '',
      buttonTextDisabled: '',
      button: '',
      buttonDanger: '',
      separator: ''
    }
  }
]
export const getColors = (mode) => {
  let colors  = {}
  for (let key in themedColors) {
   colors[key] = themedColors[key][mode]
  }
  return colors
}
