import React from "react"
import { Link } from "react-router-dom"

import CardComponent from "./component"

function CardContainer(props) {
  const { link, title, content, className } = props
  return (
    <div className={className}>
      <Link to={link}>
        <CardComponent
          content={content}
          title={title}
        />
      </Link>
    </div>
  )
}

export default CardContainer

