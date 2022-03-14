import { useColorModeValue, VStack } from "@chakra-ui/react";
import About from "../src/templates/about";
import { Main } from "../src/templates/main";

const Index = ({ data }) => {
  return (
    <VStack minH="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
      <Main />
      <About assets={data.bundles} />
    </VStack>
  );
};

export default Index;

export async function getStaticProps() {
  const data = await fetch(
    "https://api.opensea.io/api/v1/bundles?limit=2&offset=0",
    { method: "GET" }
  ).then((res) => res.json());

  return { props: { data }, revalidate: 60 * 60 * 1000 };
}
