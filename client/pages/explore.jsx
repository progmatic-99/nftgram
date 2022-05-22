import { Container } from "@chakra-ui/react";
import React from "react";
import Ethereum from "../src/components/ethereum";
import withAuth from "../src/components/withAuth";

const Explore = () => {
  return (
    <Container maxW="container.lg" p={8} centerContent>
      <Ethereum />
    </Container>
  );
};

export default withAuth(Explore);
