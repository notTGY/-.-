import React from "react"

function CardComponent({title, content}) {
  return (
    <>
      <h2>{title}</h2>
      <pre>{content}</pre>
    </>
  )
}

export default CardComponent

