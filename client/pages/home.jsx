import { Container } from "@chakra-ui/react";
import React from "react";
import Details from "../src/components/home/details";
import UserWallet from "../src/components/home/userWallet";
import withAuth from "../src/components/withAuth";

const Home = () => {
  return (
    <Container minH="100vh" maxW="container.lg">
      <UserWallet />
      <Details />
    </Container>
  );
};

export default withAuth(Home);
