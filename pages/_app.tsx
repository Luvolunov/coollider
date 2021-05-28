/* eslint-disable react/jsx-props-no-spreading */
import './global.scss';
import { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PageContainer from '../shared/components/page-container/page-container.component';
import Loader from '../shared/components/loader/loader.component';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuth = /auth/.test(router.route);
  const isError = /_error/.test(router.route);
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
        <meta name="description" content="Начни своё путешествие вместе с Куллайдером!" />
        <meta name="theme-color" content="#C8DDF0" />
        <link rel="icon" type="image/png" href="/coollider-ready.png" />
        <link rel="apple-touch-icon" sizes="1024x1024" href="/coollider-ready.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Куллайдер | Coollider</title>
      </Head>
      {
        navigating
          ? <Loader />
          : null
      }
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

App.getInitialProps = async ({ ctx: { req, res } }: any) => {
  if (!req || res.statusCode === 500) { return { props: {} }; }
  if (!req.cookies.c_a && req.url.indexOf('/auth/sign-in') === -1) {
    res.writeHead(301, {
      Location: '/auth/sign-in',
    });
    res.end();
  }
  if (req.cookies.c_a && req.url.indexOf('auth') !== -1) {
    res.writeHead(301, {
      Location: '/courses',
    });
    res.end();
  }
  return { props: {} };
};
