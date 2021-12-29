import React from "react"

function ArticleComponent(props) {
  const text = props.text

  return (
    <section className="w-full h-full flex flex-col items-center">
      <article
        dangerouslySetInnerHTML={{__html: text}}
        className="w-[320px] sm:w-[480px] md:w-[640px] rounded"
      />
    </section>
  )
}

export default ArticleComponent

