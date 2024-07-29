module.exports = (_content) => {
  let rowContent = _content.split('\n')
  let interestRow = rowContent.filter((row) => {
    return row.indexOf('{"mMessageId":6,"') !== -1
  })

  let res = interestRow.map((row) => {
    rowStart = row.substring(row.indexOf('{"mMessageId":6,"'))
    rowFin = rowStart.substring(0, rowStart.indexOf('}') + 1)
    return JSON.parse(rowFin)
  })

  return res
}
