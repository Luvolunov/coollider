import React from 'react';
import NextDocument, {
  Html, Head, Main, NextScript,
} from 'next/document';

const yaMetrika = `
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(74119825, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
`;

const googleAnalytics = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-1QGC465DXH');
`;

export default class AppDocument extends NextDocument {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="description" content="Начни своё путешествие вместе с Куллайдером!" />
          <meta name="theme-color" content="#C8DDF0" />
          <link rel="icon" type="image/png" href="/coollider-ready.png" />
          <link rel="apple-touch-icon" sizes="1024x1024" href="/coollider-ready.png" />
          <link rel="manifest" href="/manifest.json" />
          <title>Куллайдер | Coollider</title>
          <script
            async
            data-ad-client="ca-pub-7977093531586489"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-1QGC465DXH" />
          <script dangerouslySetInnerHTML={{ __html: googleAnalytics }} />
          <script dangerouslySetInnerHTML={{ __html: yaMetrika }} />
          <noscript>
            <div>
              <img src="https://mc.yandex.ru/watch/74119825" style={{ position: 'absolute', left: '-9999px' }} alt="" />
            </div>
          </noscript>
        </Head>
        <body>
          <link rel="stylesheet" href="/fonts/fonts.css" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
