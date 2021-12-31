import React from "react"

import
  ArticleSelectorComponent
from "../components/ArticleSelector"
import Header from "../components/Header"
import GTM from "../components/GTM"

import mdfile from '../../posts/posts.json'

function ArticleSelector() {
  const title = "Старый повар на счастливом конце"
  const description = "Микроблог Старого повара о его успехах в Subway Surfers. Новый пост каждую неделю! :) заходи почитать только на счастливом конце!"
  return (
  <>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Старый повар</title>

      <meta property="og:title" content={title}/>
      <meta property="twitter:title" content={title}/>

      <meta property="description" content={description}/>
      <meta name="description" content={description}/>
      <meta itemProp="description" content={description}/>
      <meta property="twitter:description" content={description}/>

      <meta property="og:type" content="website"/>

      <meta property="keywords" content="subway surfers, subway surf, старый повар, счастливый конец"/>

      <meta property="og:author" content="https://vk.com/amatrosov47"/>

      <meta property="og:publisher" content="https://vk.com/amatrosov47"/>

      <meta property="og:locale" content="ru_RU"/>

      <meta property="og:site_mame" content="Счастливый конец.рф"/>

      <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png"/>
      <link rel="manifest" href="./site.webmanifest"/>
      <link rel="mask-icon" href="./safari-pinned-tab.svg" color="#5bbad5"/>
      <meta name="msapplication-TileColor" content="#9f00a7"/>
      <meta name="theme-color" content="#ffffff"/>

      <meta property="og:image" content="./thumbnail.png"/>

      <link rel="stylesheet" href="./index.css"/>
      <GTM/>
    </head>
    <body className="h-full">
      <Header/>
      <ArticleSelectorComponent mdfile={mdfile} />
      <script src="./index.js"></script>
    </body>
  </>
  )
}

export default ArticleSelector

