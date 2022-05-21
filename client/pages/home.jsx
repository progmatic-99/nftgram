import { Container, VStack } from "@chakra-ui/react";
import React from "react";
import Rarible from "../src/components/rarible";
import withAuth from "../src/components/withAuth";

const chains = ["SOLANA", "POLYGON", "TEZOS"];

const Home = () => {
  return (
    <Container maxW="container.lg">
      {chains.map((chain) => {
        return (
          <VStack spacing={4}>
            <Heading>{chain}</Heading>
            <Rarible chain={chain} />
          </VStack>
        );
      })}
    </Container>
  );
};

export default withAuth(Home);
