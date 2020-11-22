import React from "react";

import Document, { Html, Head, Main, NextScript } from "next/document";

import { apiUrl } from "@temp/constants";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href={apiUrl} />
          <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
