const path = require('path')
const fs = require('fs')
const CWebp = require('cwebp').CWebp
const { build } = require('esbuild')

async function transformMd(obj, file) {
  const id = file.replace(/\.md$/, '')
  obj[id] = (await fs.promises.readFile(
    `posts/${file}`
  )).toString()
}
async function createJSON() {
  const dir = fs.readdirSync('posts')
  const obj = {}
  const proms = dir.map(file => {
    if (!file.match(/.md$/g)) return
    return transformMd(obj, file)
  })
  await Promise.all(proms)
  const json = JSON.stringify(obj)
  fs.writeFileSync('posts/posts.json', json)
}

async function copyStatic() {
  const dir = fs.readdirSync('static')

  const dir2 = fs.readdirSync('public')

  if (!fs.existsSync('dist/static'))
    fs.mkdirSync('dist/static', {recursive: true})

  const proms = dir.map(file => {
    if (file.match(/\.jpg$/g)) {
      const encoder = new CWebp(`static/${file}`)
      const newFile = file.replace(/\.jpg$/g, '.webp')
      return encoder.write(`dist/static/${newFile}`)
    }
    return fs.promises.copyFile(
      `static/${file}`, `dist/static/${file}`
    )
  })

  const proms2 = dir2.map(file => {
    return fs.promises.copyFile(
      `public/${file}`, `dist/${file}`
    )
  })

  await Promise.all(proms.concat(proms2))
}


copyStatic()
  .then(createJSON)
  .then(() =>
    build({
      entryPoints: ['src/index.js'],
      bundle: true,
      minify: true,
      outdir: 'dist',
      logLevel: 'info',
      loader: { ".js": "jsx" },
    })
  ).then(prerender)

function prerender() {
  require('ignore-styles')

  require('@babel/register')({
    configFile: path.resolve(__dirname, "../babel.config.js")
  })

  const prerender = require('./prerender.js')
  prerender()
}

