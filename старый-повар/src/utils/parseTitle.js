function parseTitle(text) {
  const startOfTitle = text
    .substring(text.search(/^# /))
  return (
    `Старый повар - ${startOfTitle.substring(
      2, startOfTitle.indexOf('\n')
    )}`
  )
}

export default parseTitle

