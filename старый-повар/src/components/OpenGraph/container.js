import React from "react"

import parseTitle from "../../utils/parseTitle"
import parseDescription from "../../utils/parseDescription"

import OpenGraphComponent from "./component"


function OpenGraphContainer(props) {
  const { articleId, articleData } = props

  const title = parseTitle(articleData)
  const description = parseDescription(articleData)

  return <OpenGraphComponent
    title={title}
    description={description}
  />
}

export default OpenGraphContainer

