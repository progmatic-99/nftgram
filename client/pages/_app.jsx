import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../src/components/layout";
import theme from "../src/theme";
import "../style.css";
import Sidebar from "../src/components/sidebar";
import { useStore } from "../src/store/user";


function MyApp({ Component, pageProps }) {
  const user = useStore((state) => state.user);

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        {user && <Sidebar />}
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
