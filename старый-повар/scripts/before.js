const fs = require('fs')

const POSTS_DIR = "public/posts"

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

module.exports = createJSON

