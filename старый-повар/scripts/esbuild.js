const path = require('path')
const fs = require('fs')
const CWebp = require('cwebp').CWebp
const { build: esbuild } = require('esbuild')

const OUT_DIR = "docs"
const POSTS_DIR = "posts"

async function createJSON() {
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
}

function genPathToOutDir(dir) {
}

async function compileStatic(folder) {
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

    if (file.match(/\.jpg$/g)) {
      const encoder = new CWebp(pathToFile)
      const newFile = file.replace(/\.jpg$/g, '.webp')
      encoder.write(`${outDir}/${newFile}`)
    }

    return fs.promises.copyFile(
      pathToFile, `${outDir}/${file}`
    )
  })

  await Promise.all(proms)
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
  ).then(() => {
    require('ignore-styles')

    require('@babel/register')({
      configFile: path.resolve(__dirname, "../babel.config.js")
    })

    const prerender = require('./prerender.js')
    prerender(OUT_DIR, POSTS_DIR)
  })

