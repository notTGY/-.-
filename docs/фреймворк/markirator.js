const fs = require('fs')
const { resolve } = require('path')
const [ nodeArg, exeName, firstArg, secondArg ] = process.argv

const printAndExit = (message, code) => {
  code ? console.error(message) : console.log(message)
  process.exit(code)
}

if (!firstArg || firstArg === 'info') printAndExit(
`# Markirator v1.0.0
---
Usage: node markirator.js infile [outfile]`,
0)

const fin = resolve(__dirname, firstArg)
const md = fs.readFileSync(fin, 'utf8')

const unesc = str => str.replace(/</g, '&lt;')

const convertInline = line =>
  replaceCode(unesc(line))
    .replace(/!\[([^\]]*)]\(([^(]+)\)/g, '<img alt="$1" src="$2">')
    .replace(/\[([^\]]*)]\(([^(]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^\*]*)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]*)__/g, '<strong>$1</strong>')
    .replace(/\*([^\*]*)\*/g, '<em>$1</em>')
    .replace(/_([^_]*)_/g, '<em>$1</em>')
    .trim()

const convertBlock = block => {
  if (block === '') return ''
  const line = block.split('\n')
  const first = line[0][0]
  if (first === '<') return block
  if (first === '#') {
    const order = line[0].split('').findIndex(c => c !== '#')
    const text = convertInline(line[0].substring(order))
    line.shift()
    return `<h${order}>\n${text}\n</h${order}>\n${convertBlock(line.join('\n'))}`
  }
  if (line[0].match(/^---/)) {
    line.shift()
    return `<hr>\n${convertBlock(line.join('\n'))}`
  }
  if (first === '>')
    return `<blockquote>\n${convertBlock(line.map(line => line.substring(2)).join('\n'))}\n</blockquote>\n`
  if (first === '*') {
    const lis = line.map(line => line.substring(2)).map(convertInline)
    return `<ul>\n<li>${lis.join('</li>\n<li>')}</li>\n</ul>\n`
  }
  if (line[0].match(/^\d+\./)) {
    const lis = line.map(line => line.replace(/^\d+\./, '')).map(convertInline)
    return `<ol>\n<li>${lis.join('</li>\n<li>')}</li>\n</ol>\n`
  }
  if (first === ' ') return `<pre>\n${unesc(block)}</pre>\n`
  return `<p>\n${convertInline(block)}</p>\n`
}

const blocks = md.replace(/\r\n/g, '\n').split(/\n\n+/)

const banner = `
<p style="border-radius: 5px; border: 1px solid grey; background: lightyellow; padding: 1rem">
  Generated HTML via <a href="https://gist.github.com/notTGY/9065ded41067b428931021ca0c8993b4">markirator.js</a>
</p>
`
const data = '<article>' + banner + blocks.map(convertBlock).join('\n') + '</article>'

if (!secondArg) printAndExit(data, 0)
const fout = resolve(__dirname, secondArg)
fs.writeFileSync(fout, data)

function replaceCode (e) { return e.replace(/`([^`]+)`/g, '<code>$1</code>') }
