import React from "react"

import { mmd } from "../../lib/mmd"

import ArticleComponent from "./component"

function ArticleContainer(props) {
  const text = mmd(props.md || '')

  return <ArticleComponent text={text}/>
}

export default ArticleContainer

