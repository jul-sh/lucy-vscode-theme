import tinycolor from 'tinycolor2'
import colorBlend from 'color-blend'

const THEME_VARIANTS = [
  {
    label: 'lucy',
    uiTheme: 'vs-dark',
    path: './dist/lucy-theme.json',
    filter: colorCode => colorCode
  },
  {
    label: 'lucy warm',
    uiTheme: 'vs-dark',
    path: './dist/lucy-warm-theme.json',
    filter: colorCode =>
      tinycolor(
        colorBlend.softLight(
          tinycolor(colorCode).toRgb(),
          tinycolor('red').toRgb()
        )
      ).toHexString()
  }
]

export default THEME_VARIANTS
