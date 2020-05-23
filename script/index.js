const fs = require('fs')
const path = require('path')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)
const gifToBoxShadow = require('./lib/gifToBoxShadow')
const rootDir = process.cwd()

const generateScssFile = (fileName, variableName ,value) => {
  return writeFile(
    path.join(rootDir, `./sass/${fileName}`),
    `${variableName}: ${value};`
  )
}

const main = async () => {
  try {
    const result = await Promise.all([
      gifToBoxShadow(path.join(rootDir, './img/1.gif')),
      gifToBoxShadow(path.join(rootDir, './img/2.gif')),
      gifToBoxShadow(path.join(rootDir, './img/3.gif')),
      gifToBoxShadow(path.join(rootDir, './img/4.gif')),
      gifToBoxShadow(path.join(rootDir, './img/5.gif')),
      gifToBoxShadow(path.join(rootDir, './img/6.gif')),
      gifToBoxShadow(path.join(rootDir, './img/7.gif')),
      gifToBoxShadow(path.join(rootDir, './img/8.gif')),
      gifToBoxShadow(path.join(rootDir, './img/9.gif')),
      gifToBoxShadow(path.join(rootDir, './img/10.gif'))
    ])
    await Promise.all([
      generateScssFile('_box-shadow-1.scss', '$box-shadow-1', result[0]),
      generateScssFile('_box-shadow-2.scss', '$box-shadow-2', result[1]),
      generateScssFile('_box-shadow-3.scss', '$box-shadow-3', result[2]),
      generateScssFile('_box-shadow-4.scss', '$box-shadow-4', result[3]),
      generateScssFile('_box-shadow-5.scss', '$box-shadow-5', result[4]),
      generateScssFile('_box-shadow-6.scss', '$box-shadow-6', result[5]),
      generateScssFile('_box-shadow-7.scss', '$box-shadow-7', result[6]),
      generateScssFile('_box-shadow-8.scss', '$box-shadow-8', result[7]),
      generateScssFile('_box-shadow-9.scss', '$box-shadow-9', result[8]),
      generateScssFile('_box-shadow-10.scss', '$box-shadow-10', result[9])
    ])
    console.log('Finished generate scss files.')
  } catch (error) {
    console.error(error)
  }
}

main()
