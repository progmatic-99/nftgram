import { Container, Heading } from "@chakra-ui/react";
import React from "react";
// import withAuth from "../src/components/withAuth";
import { useStore } from "../src/store/user";

const Profile = () => {
  const user = useStore((state) => state.user);

  return (
    <Container maxW="container.lg" h="100vh" pt={6}>
      <Heading size="md">Connected Wallets</Heading>
    </Container>
  );
};

export default Profile;
