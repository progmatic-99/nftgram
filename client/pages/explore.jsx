import { Container, VStack } from "@chakra-ui/react";
import React from "react";
import Ethereum from "../src/components/ethereum";
import Rarible from "../src/components/rarible";
import withAuth from "../src/components/withAuth";

const Explore = () => {
  return (
    <Container maxW="container.xl" p={8} centerContent>
      <VStack spacing={16}>
        <Rarible chain="SOLANA" />
        <Ethereum />
      </VStack>
    </Container>
  );
};

export default withAuth(Explore);
