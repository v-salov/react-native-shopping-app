const testColor = {
  mainColor: '#EBECF4',
    mainBackgroundColor: "#000",
  buttonColor: '#ff8200',
  separatorColor: 'rgb(68, 66, 66)',
  color1: '#4C4C4C',
  color2: '#333434',
  color3: '#696969',
  color4: '#151515',
  color5: '#222222',
  color6: '#0F0F0F',
  color7: '#292A2F',
  color8: '#3E464B',
  color9: '#2F97DD',
  color10: '#31A8F8',
  color11: '#3E464B',

};

const palette = {
  palette01: '#000000',
  palette02: '#EBECF4',
  palette03: '#ff8200',
  palette04: 'rgb(68, 66, 66)',
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

}
export const colors = {
  paragraphText: palette.palette01,
  buttonPrimaryBg: palette.palette02,
  headingText: palette.palette01,
}
export const themedColors = {
  default: {
    ...colors,
  },
  light: {
    ...colors,
  },
  dark: {
    ...colors,
    buttonPrimaryBg: palette.palette01,
    paragraphText: palette.palette02,
  },
}
