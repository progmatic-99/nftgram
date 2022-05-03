import { VStack } from "@chakra-ui/react";
import About from "../src/templates/about";
import { Main } from "../src/templates/main";
import { OPENSEA_URL } from "../src/utils/urls";

const Index = ({ data }) => {
  return (
    <VStack minH="100vh">
      <Main />
      <About assets={data.bundles} />
    </VStack>
  );
};

export default Index;

export async function getStaticProps() {
  const data = await fetch(`${OPENSEA_URL}bundles?limit=2&offset=0`, {
    method: "GET",
  }).then((res) => res.json());

  return { props: { data }, revalidate: 60 * 60 * 1000 };
}
