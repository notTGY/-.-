const fs = require('fs')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter } = require('react-router-dom/server')

async function prerender(OUT_DIR, POSTS_DIR) {
  const App = require('../src/App').default
  const mdfile = require(`../${POSTS_DIR}/posts.json`)

  async function renderLoc(url = "") {
    const react = ReactDOMServer.renderToString(
      <StaticRouter location={url}>
        <App/>
      </StaticRouter>
    )

    const renderedHTML = `<!DOCTYPE html><html lang="ru" class="h-full">${react}</html>`

    if (!fs.existsSync(`${OUT_DIR}/${url}`))
      fs.mkdirSync(`${OUT_DIR}/${url}`, {recursive: true})

    fs.writeFileSync(
      url
      ? `${OUT_DIR}/${url}/index.html`
      : `${OUT_DIR}/index.html`,
      renderedHTML,
    )
  }
  const proms = []
  proms.push(renderLoc())
  for (const post in mdfile) {
    proms.push(renderLoc(`/${post}`))
  }

  await Promise.all(proms)

  console.log('prerender finished')
}

function start(...args) {
  prerender(...args)
}

module.exports = start

