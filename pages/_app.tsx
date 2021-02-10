import './global.scss';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
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
        <link rel="preload" as="font" href="/fonts/fonts.css" />
        <title>Куллайдер | Coollider</title>
      </Head>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}
