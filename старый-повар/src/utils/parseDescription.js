function parseDescription(text) {
  return text
    .replace(/^(!.*$|#* )/gm, '')
    .replace(/\r\n\r\n/gm, '\n')
    .replace(/\n\n/gm, '\n')
}

export default parseDescription

