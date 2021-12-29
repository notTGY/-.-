import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import OpenGraph from "../components/OpenGraph"
import ArticleComponent from "../components/Article"
import Header from "../components/Header"

import mdfile from '../../posts/posts.json'

function Article() {
  const params = useParams()
  const id = params.id

  const md = mdfile[id]

  return (
  <>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <OpenGraph articleId={id} articleData={md} />
      <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png"/>
      <link rel="manifest" href="./site.webmanifest"/>
      <link rel="mask-icon" href="./safari-pinned-tab.svg" color="#5bbad5"/>
      <meta name="msapplication-TileColor" content="#9f00a7"/>
      <meta name="theme-color" content="#ffffff"/>

      <meta property="og:image" content="./thumbnail.png"/>

      <link rel="stylesheet" href="../index.css"/>
    </head>
    <body className="h-full bg-slate-100">
      <Header/>
      <ArticleComponent md={md}/>
      <script src="../index.js"></script>
    </body>
  </>
  )
}

export default Article

