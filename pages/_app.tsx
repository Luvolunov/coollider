/* eslint-disable react/jsx-props-no-spreading,import/no-mutable-exports */
import './global.scss';
import { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PageContainer from '../shared/components/page-container/page-container.component';
import Loader from '../shared/components/loader/loader.component';
import { setPrompt } from '../store/prompt';

if (process.browser) {
  window.addEventListener('beforeinstallprompt', (e) => {
    setPrompt(e);
  });
}

export default function Coollider({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuth = /auth/.test(router.route);
  const isError = /404|500/.test(router.route);
  const isLesson = /\/lesson\//.test(router.route);
  const [navigating, setNavigating] = useState(false);
  if (process.browser && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
  useEffect(() => {
    const navigationStart = () => setNavigating(true);
    const navigationFinish = () => setNavigating(false);
    router.events.on('routeChangeStart', navigationStart);
    router.events.on('routeChangeComplete', navigationFinish);
    return () => {
      router.events.off('routeChangeStart', navigationStart);
      router.events.off('routeChangeComplete', navigationFinish);
    };
  });
  return (
    <React.StrictMode>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Начни обучаться на платформе Куллайдер прямо сейчас!" />
        <meta name="theme-color" content="#E9EBF8" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <title>Куллайдер | Образовательная платформа</title>
      </Head>
      {
        navigating
          ? <Loader />
          : null
      }
      {
        !isAuth && !isError && !isLesson
          ? (
            <DndProvider backend={HTML5Backend}>
              <PageContainer>
                <Component {...pageProps} />
              </PageContainer>
            </DndProvider>
          )
          : <Component {...pageProps} />
      }
    </React.StrictMode>
  );
}
