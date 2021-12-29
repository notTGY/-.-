import React from "react"

import Card from "../Card"

function ArticleSelectorComponent({ articles }) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <main
        className="w-[320px] sm:w-[480px] md:w-[640px] rounded"
      >
        {articles.map(
          article => <Card
            link={`/${article.id}`}
            title={article.title}
            content={article.description}
            className="article-card"
            key={article.id}
          />
        )}
      </main>
    </div>
  )
}

export default ArticleSelectorComponent

