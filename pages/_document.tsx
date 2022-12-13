import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="/logo/logo-ao.png" href="/logo/logo-ao.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <meta name="description"
          content="Rejoignez Virtualia Shop, une communauté de boutiques réelles visitables virtuellement pour acheter local!" />
        <meta name="author" content="Virtualia Interactive Technologies" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <script defer src="https://static.matterport.com/showcase-sdk/latest.js"></script>
      </Head>
      <body className="bg-neutral-50 h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
