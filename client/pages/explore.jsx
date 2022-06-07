import { Container, VStack } from "@chakra-ui/react";
import React from "react";
import withAuth from "../src/components/withAuth";
import Ethereum from "../src/components/explore/ethereum";
import Rarible from "../src/components/explore/rarible";
import UserFeed from "../src/components/explore/userFeed";

const Explore = () => {
  return (
    <Container maxW="container.xl" p={8} centerContent>
      <VStack spacing={16}>
        <UserFeed />
        <Rarible chain="SOLANA" />
        <Ethereum />
      </VStack>
    </Container>
  );
};

export default withAuth(Explore);
