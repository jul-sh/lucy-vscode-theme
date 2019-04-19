import { writeFile } from 'fs'
import { promisify } from 'util'
import getTheme from './getTheme'
import colors from './colors'

const promisifiedWriteFile = promisify(writeFile)
const EXPORT_PATH = './dist/color-theme.json'

const buildTheme = async path => {
  const themeWithColors = getTheme(colors)

  try {
    await promisifiedWriteFile(path, JSON.stringify(themeWithColors))
    console.log('🌺 Theme built. 💅')
  } catch (error) {
    console.log(error)
  }
}

buildTheme(EXPORT_PATH)
