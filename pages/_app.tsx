/* eslint-disable react/jsx-props-no-spreading */
import './global.scss';
import { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
