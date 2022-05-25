import Head from "next/head";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../src/components/layout";
import theme from "../src/theme";
import "../style.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../src/components/errorFallback";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Qrator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
