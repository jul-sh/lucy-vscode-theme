import { readFile } from 'fs'
import fsPath from 'fs-path'
import { promisify } from 'util'
import getTheme from './getTheme'
import getColors from './getColors'
import themeVariants from './themeVariants'

function buildVariants() {
  return themeVariants.map(({ path, filter }) => {
    promisify(fsPath.writeFile)(path, getTheme(getColors(filter)))
  })
}

async function listVariantsInPackageDotJson() {
  const parsedPackageDotJson = JSON.parse(
    await promisify(readFile)('./package.json')
  )

  parsedPackageDotJson.contributes.themes = themeVariants.map(
    ({ label, uiTheme, path }) => ({ label, uiTheme, path })
  )

  await promisify(fsPath.writeFile)(
    './package.json',
    JSON.stringify(parsedPackageDotJson, null, '\t')
  )
}

async function buildTheme() {
  try {
    await Promise.all([...buildVariants(), listVariantsInPackageDotJson()])
    console.log('Theme built!')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

buildTheme()
