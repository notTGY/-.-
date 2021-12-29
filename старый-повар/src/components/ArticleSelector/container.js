import React from "react"

import parseTitle from "../../utils/parseTitle"
import parseDescription from "../../utils/parseDescription"

import ArticleSelectorComponent from "./component"

function ArticleSelectorContainer(props) {
  const mdfile = props.mdfile || {}

  const articles = []
  for (const id in mdfile) {
    const title = parseTitle(mdfile[id])
    const description = parseDescription(mdfile[id])
    const shortDescription = description.substring(0, 77) + '...'
    articles.push({
      id,
      title,
      description: shortDescription,
    })
  }

  return (
    <ArticleSelectorComponent
      articles={articles}
    />
  )
}

export default ArticleSelectorContainer

