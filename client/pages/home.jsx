import { Container, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import Ethereum from "../src/components/ethereum";
import Rarible from "../src/components/rarible";
import withAuth from "../src/components/withAuth";

const Home = () => {
  return (
    <Container maxW="container.lg" p={8} centerContent>
      <VStack spacing={8}>
        <VStack>
          <Heading>SOLANA</Heading>
          <Rarible chain="SOLANA" />
        </VStack>
        <VStack>
          <Heading m={(8, 0, 8, 0)}>ETHEREUM</Heading>
          <Ethereum />
        </VStack>
      </VStack>
    </Container>
  );
};

export default withAuth(Home);
