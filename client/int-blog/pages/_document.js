import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
          
        <Head>
        <link rel="preload" href="https://iblogapi.herokuapp.com/api/" as="fetch" crossOrigin="anonymous"/>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument