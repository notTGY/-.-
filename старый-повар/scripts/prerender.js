const fs = require('fs')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter } = require('react-router-dom/server')

async function prerender() {
  const App = require('../src/App').default
  const mdfile = require('../posts/posts.json')

  async function renderLoc(url = "") {
    const react = ReactDOMServer.renderToString(
      <StaticRouter location={url}>
        <App/>
      </StaticRouter>
    )

    const renderedHTML = `<!DOCTYPE html><html lang="ru" class="h-full">${react}</html>`

    if (!fs.existsSync(`dist/${url}`))
      fs.mkdirSync(`dist/${url}`, {recursive: true})

    fs.writeFileSync(
      url
      ? `dist/${url}/index.html`
      : 'dist/index.html',
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

function start() {
  prerender()
}

module.exports = start

