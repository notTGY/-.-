import React from "react"

function OpenGraphComponent({ title, description }) {
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title}/>
      <meta property="twitter:title" content={title}/>

      <meta property="description" content={description}/>
      <meta name="description" content={description}/>
      <meta itemProp="description" content={description}/>
      <meta property="og:description" content={description}/>
      <meta property="twitter:description" content={description}/>

      <meta property="og:type" content="article"/>

      <meta property="keywords" content="subway surfers, subway surf, старый повар, счастливый конец"/>

      <meta property="og:author" content="https://vk.com/amatrosov47"/>

      <meta property="og:publisher" content="https://vk.com/amatrosov47"/>

      <meta property="og:locale" content="ru_RU"/>

      <meta property="og:site_mame" content="Счастливый конец.рф"/>
    </>
  )
}

export default OpenGraphComponent

