import Document, {
  DocumentContext,
  Head,
  Main,
  Html,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import { Fragment } from "react";

interface DocumentProps {
  styleTags?: any;
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <>
            <Fragment key={1}>{initialProps.styles}</Fragment>
            <Fragment key={2}>{sheet.getStyleElement()}</Fragment>
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
