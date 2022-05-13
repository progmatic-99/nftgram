import {
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import withAuth from "../src/components/withAuth";
import { useStore } from "../src/store/user";
import { wallets } from "../pages/signup";
import UserLayout from "../src/components/userLayout";

const Profile = () => {
  const user = useStore((state) => state.user);

  return (
    <Container maxW="container.lg" h="100vh" pt={6}>
      <Heading size="md">Connected Wallets</Heading>
      <Flex p={4} spacing={8} justifyContent="space-around">
        {wallets.map(({ name, img }) => {
          return (
            <VStack key={name} p={2} border="1px solid black">
              <HStack spacing={12}>
                <Image src={img} alt="Wallet Image" h="30px" w="30px" />
                <Heading size="sm">{name}</Heading>
              </HStack>
              <HStack>
                <Heading size="sm">Wallet ID</Heading>
                <Text size="sm">#hex987sasd</Text>
              </HStack>
            </VStack>
          );
        })}
      </Flex>
      <VStack m={4}>
        <Heading size="md">Liked Posts</Heading>
        <SimpleGrid></SimpleGrid>
      </VStack>
    </Container>
  );
};

Profile.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>;
};

export default withAuth(Profile);
