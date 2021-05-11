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
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
