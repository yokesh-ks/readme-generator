// index-template.js
const path = require('path')

function defaultIndexTemplate(filePaths) {
  const reactEntries = `import React from 'react'`
  const importEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath))
    const importName = /^\d/.test(basename) ? `Svg${basename}` : basename
    return `import Svg${importName} from './${basename}'`
  })

  importEntries.unshift(reactEntries)

  const exportData = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath))
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
    return `if(props.name === "${exportName}"){
      return <Svg${exportName} {...props}/>
    }`
  })

  const exportDataName = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath))
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
    return `'${exportName}'`
  })

  const exportEntries = `\nexport const Icon = (props) => {${exportData.join(
    '\n',
  )}}`

  const exportPropTypes = `export const PropTypes = [${exportDataName}]`

  importEntries.push(exportEntries)
  importEntries.push(exportPropTypes)

  return importEntries.join('\n')
}

module.exports = defaultIndexTemplate
