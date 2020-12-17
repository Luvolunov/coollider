import './global.scss';
import { AppProps } from 'next/app';
import Head from "next/head";
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <meta name="theme-color" content="#C8DDF0" />
        </Head>
        <Component {...pageProps} />
      </>
  );
}
