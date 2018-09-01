import { writeFile } from 'fs'
import getTheme from './getTheme'
import color from './colors'

const themeWithColors = getTheme(color)
const stringifiedTheme = JSON.stringify(themeWithColors)

writeFile('./themes/lucy-color-theme.json', stringifiedTheme, error =>
  console.log(error ? error : '✨ theme built')
)
