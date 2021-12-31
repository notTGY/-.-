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
  const sortedArticles = articles.sort(
    (i, j) => Number(j.id) - Number(i.id)
  )

  return (
    <ArticleSelectorComponent
      articles={sortedArticles}
    />
  )
}

export default ArticleSelectorContainer

