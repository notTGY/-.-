import фреймворк from './фреймворк.js'

const App = () => {
  return [ 'hello', ', ', 'World', '!' ]
}

const render = фреймворк(
  document.getElementById('root'), App
)

