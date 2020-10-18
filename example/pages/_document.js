/* eslint-disable react/no-danger */
/* eslint-disable react/react-in-jsx-scope */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class _Document extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();

    try {
      const page = renderPage((App) => (props) =>
        sheet.collectStyles(
          <App
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        )
      );
      const styleTags = sheet.getStyleElement();

      return { ...page, styleTags };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { styleTags } = this.props;
    return (
      <Html lang="es-MX">
        <Head>
          <meta charSet="utf-8" />
          <noscript data-n-css="true" />
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
