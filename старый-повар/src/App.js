import React from "react"
import { Route, Routes as Switch, } from "react-router"

import ArticleSelector from "./pages/ArticleSelector"
import Article from "./pages/Article"

function App() {
  return (
    <Switch>
      <Route path="/" element={<ArticleSelector />}></Route>
      <Route path="/:id" element={<Article />} />
    </Switch>
  )
}

export default App

