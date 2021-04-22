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

export default class AppDocument extends NextDocument {
  render() {
    return (
      <Html lang="ru">
        <Head>
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
