import { writeFile } from 'fs'
import { promisify } from 'util'
import chroma from 'chroma-js'
import getTheme from './getTheme.mjs'
import colors from './colors.mjs'

const promisifiedWriteFile = promisify(writeFile)

// These variants need to be listed as seperate themes in the package.json
const VARIANTS = {
  lucy: (color) => color,
  'lucy-evening': (color) => {
    const [red, green, blue, alpha] = chroma(color).rgba()

    const sum = red + green + blue

    const clamp = (number) => Math.min(Math.max(number, 0), 255)

    // Shift colors while preserving luminosity
    const newRed = clamp(red * (1 + 0.175 * (1 - sum / 800)))
    const newGreen = clamp(green * (1 - 0.01 * (1 - sum / 800)))
    const newBlue = clamp(sum - (newRed + newGreen))

    return chroma({ r: newRed, g: newGreen, b: newBlue, a: alpha }).hex()
  }
}

const getExportPath = (name) => `./dist/${name}.json`

const buildTheme = async () => {
  try {
    await Promise.all(
      Object.entries(VARIANTS).map(([variantName, getColor]) => {
        const themeWithColors = getTheme({
          name: variantName,
          colors: Object.entries(colors).reduce(
            (acc, [colorName, colorValue]) => ({
              ...acc,
              [colorName]: getColor(colorValue)
            }),
            {}
          )
        })

        return promisifiedWriteFile(
          getExportPath(variantName),
          JSON.stringify(themeWithColors)
        )
      })
    )
    console.log('🌺 Theme built. 💅')
  } catch (error) {
    console.log(error)
  }
}

buildTheme()
