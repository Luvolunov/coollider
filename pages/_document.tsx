import NextDocument, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class AppDocument extends NextDocument {
  render() {
    return (
      <Html lang="ru">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
