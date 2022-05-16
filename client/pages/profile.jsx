import { Container, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import React, { useCallback } from "react";
import withAuth from "../src/components/withAuth";
import { useStore } from "../src/store/user";

const Profile = () => {
  const user = useStore(useCallback((state) => state.user, []));

  return (
    <Container maxW="container.lg" h="100vh" pt={6}>
      <Heading size="md">Liked Posts</Heading>
      <VStack m={4}>
        <SimpleGrid></SimpleGrid>
      </VStack>
    </Container>
  );
};

export default withAuth(Profile);
