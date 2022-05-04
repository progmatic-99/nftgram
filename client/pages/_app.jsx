import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../src/components/layout";
import theme from "../src/theme";
import "../style.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        {Component.Layout ? (
          <Component.Layout>
            <Component {...pageProps} />
          </Component.Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
