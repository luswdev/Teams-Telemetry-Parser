module.exports = (_content) => {
  let rowContent = _content.split('\n')
  let interestRow = rowContent.filter((row) => {
    return row.indexOf('Received Response : {"mMessageId":6,"') !== -1
  })

  let res = interestRow.map((row) => {
    return JSON.parse(row.substr(row.indexOf('{')))
  })

  return res
}
