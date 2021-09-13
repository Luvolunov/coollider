/* eslint-disable react/jsx-props-no-spreading */
import './global.scss';
import App, { AppContext, AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PageContainer from '../shared/components/page-container/page-container.component';
import Loader from '../shared/components/loader/loader.component';
import { buildUrl } from '../shared/utils/build-url';

export default function Coollider({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuth = /auth/.test(router.route);
  const isError = /_error/.test(router.route);
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
        <meta name="description" content="Начни своё путешествие вместе с Куллайдером!" />
        <meta name="theme-color" content="#fff" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <meta name="msapplication-TileImage" content="images/favicons/ms-icon-144x144.png" />
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
            <PageContainer>
              <Component {...pageProps} />
            </PageContainer>
          )
          : <Component {...pageProps} />
      }
    </React.StrictMode>
  );
}

Coollider.getInitialProps = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext);
  if (!appContext.ctx.res || props.pageProps.statusCode === 500) {
    return { ...props };
  }
  const res = appContext.ctx.req ? await fetch(buildUrl('user/profile'), {
    headers: {
      Cookie: appContext.ctx.req?.headers.cookie || '',
    },
  }) : null;
  const isAuthPages = appContext.ctx.req?.url?.indexOf('auth') !== -1;
  const authorized = res?.status !== 401;
  if (appContext.ctx.res.writeHead && ((isAuthPages && authorized) || (appContext.ctx.req?.url === '/' && authorized))) {
    appContext.ctx.res?.writeHead(301, {
      Location: '/courses',
    });
    appContext.ctx.res?.end();
  }
  if (appContext.ctx.res.writeHead && ((!authorized && !isAuthPages) || (appContext.ctx.req?.url === '/' && !authorized))) {
    appContext.ctx.res?.writeHead(301, {
      Location: '/auth/sign-in',
    });
    appContext.ctx.res?.end();
  }
  return { ...props };
};
