const getPixels = require('get-pixels')

/**
 * uint8ArrayToRgba()
 * @param {object} param.data
 * @param {number} param.width
 * @param {number} param.height
 * @return {object[]}
 */
const uint8ArrayToRgba = ({ data, width, height }) => {
  const colorLength = data.length / 4
  const colorList = []

  for (let i = 0; i < colorLength; i++) {
    const rowIndex = Math.ceil((i + 1) / width) - 1

    if (!colorList[rowIndex]) {
      colorList[rowIndex] = []
    }

    const dataIndex = i * 4

    colorList[rowIndex].push({
      r: data[dataIndex],
      g: data[dataIndex + 1],
      b: data[dataIndex + 2],
      a: data[dataIndex + 3] / 255
    })
  }

  return colorList
}

/**
 * getPixelColor()
 * @param {string} url
 * @return {Promise<object>}
 */
const getPixelColor = (url) => {
  return new Promise((resolve, reject) => {
    getPixels(url, (error, { data, shape }) => {
      if(error) {
        reject(error)
      }
      const width = shape[1]
      const height = shape[2]
      const rgbaList = uint8ArrayToRgba({
        data,
        width,
        height
      })
      resolve(rgbaList)
    })
  })
}

/**
 * pixelToBoxShadow()
 * @param {object[]} data
 * @return {string}
 */
const pixelToBoxShadow = (data) => {
  let boxShadow = ''

  data.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell.a <= 0) {
        return
      }
      const position = `${cellIndex}px ${rowIndex}px`
      const color = `rgba(${cell.r},${cell.g},${cell.b},${cell.a}),`
      boxShadow += `${position} ${color}`
    })
  })

  return boxShadow.replace(/\,$/, '')
}

/**
 * gifToBoxShadow()
 * @params {string} url
 * @return {Promise<string>}
 */
module.exports = async (url) => {
  try {
    const colorData = await getPixelColor(url)
    return pixelToBoxShadow(colorData)
  } catch (error) {
    return Promise.reject('Error: failed get pixel color.')
  }
}
