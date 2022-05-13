import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../src/components/layout";
import theme from "../src/theme";
import "../style.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../src/components/errorFallback";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout;
  console.log(getLayout);
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {getLayout ? (
            getLayout(<Component {...pageProps} />)
          ) : (
            <Component {...pageProps} />
          )}
        </ErrorBoundary>
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
