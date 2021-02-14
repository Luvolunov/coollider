import './global.scss';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import {useRouter} from 'next/router';
import PageContainer from "../shared/components/page-container/page-container.component";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuth = /auth/.test(router.route);
  const isError = /_error/.test(router.route);
  if (process.browser && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
  return (
    <React.StrictMode>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Начни своё путешествие вместе с Куллайдером!" />
        <meta name="theme-color" content="#C8DDF0" />
        <link rel="icon" type="image/png" href="/coollider-min.png" />
        <link rel='manifest' href='/manifest.json' />
        <link rel="stylesheet" href="/fonts/fonts.css" />
        <title>Куллайдер | Coollider</title>
      </Head>
      {
        !isAuth && !isError
          ? (
              <PageContainer>
                <Component {...pageProps} />
              </PageContainer>
            )
          : <Component {...pageProps} />
      }
    </React.StrictMode>
  );
}
