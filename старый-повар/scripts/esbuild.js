const path = require('path')
const fs = require('fs')
const CWebp = require('cwebp').CWebp
const { build: esbuild } = require('esbuild')

const OUT_DIR = "docs"
const POSTS_DIR = "posts"

const allStart = new Date().getTime()

async function createJSON() {
  const start = new Date().getTime()
  const outJSON = {}
  const dir = fs.readdirSync(POSTS_DIR)

  const proms = dir.map(file => {
    if (file.match(/.md$/g))
      return new Promise(res => {
        const id = file.replace(/\.md$/, '')
        fs.promises.readFile(`${POSTS_DIR}/${file}`)
          .then(data => {
              res(outJSON[id] = data.toString())
            }
          )
      })
  })

  await Promise.all(proms)

  fs.writeFileSync(
    `${POSTS_DIR}/posts.json`,
    JSON.stringify(outJSON)
  )
  const delta = (new Date().getTime()) - start
  console.log('generating JSON took %dms', delta)
}

async function compileStatic(folder) {
  const start = new Date().getTime()
  const dir = fs.readdirSync(folder)

  const proms = dir.map(file => {
    const pathToFile = `${folder}/${file}`

    /**
     * Omit first directory ('public/')
     */
    const rest = folder.substring(
      `${folder}/`.indexOf`/` + 1
    )
    const outDir = `${OUT_DIR}/${rest}`
    
    if (fs.lstatSync(pathToFile).isDirectory())
      return compileStatic(pathToFile)

    if (!fs.existsSync(outDir))
      fs.mkdirSync(outDir, { recursive: true })

    const imageRegex = /\.(jpg|JPEG|PNG)$/g
    if (file.match(imageRegex)) {
      const encoder = new CWebp(pathToFile)
      const newFile = file.replace(imageRegex, '.webp')
      encoder.write(`${outDir}/${newFile}`)
    }

    return fs.promises.copyFile(
      pathToFile, `${outDir}/${file}`
    )
  })

  await Promise.all(proms)
  const delta = (new Date().getTime()) - start
  console.log('copying static took %dms', delta)
}


compileStatic('public')
  .then(createJSON)
  .then(() =>
    esbuild({
      entryPoints: ['src/index.js'],
      bundle: true,
      minify: true,
      outdir: OUT_DIR,
      logLevel: 'info',
      loader: { ".js": "jsx" },
    })
  ).then(async () => {
    const start = new Date().getTime()
    require('ignore-styles')

    require('@babel/register')({
      configFile: path.resolve(__dirname, "../babel.config.js")
    })

    const prerender = require('./prerender.js')
    await prerender(OUT_DIR, POSTS_DIR)
    const delta = (new Date().getTime()) - start
    console.log('prerender took %dms', delta)

    const allDelta = (new Date().getTime()) - allStart
    console.log('all took %dms', allDelta)
  })

