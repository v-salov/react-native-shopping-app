
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

}
export const colors = {
  separatorColor: palette.palette04
}
export const themedColors = {
  primaryText: {
    light: palette.palette02,
    dark: palette.palette01,

  },
  primaryBackground: {
    light: palette.palette01,
    dark: palette.palette02,
  },
}
export const getTheme = (mode) => {
  let Theme = {};
  for (let key in themedColors) {
    Theme[key] = themedColors[key][mode];
  }
  return Theme;
};
