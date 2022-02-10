import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const wallets = [
  { name: "MetaMask", img: "/metamask.webp" },
  { name: "Phantom", img: "/phantom.webp" },
];

const Login = () => {
  return (
    <VStack spacing={4} h="100vh" align="center" pt={8}>
      <VStack>
        <Heading>Connect your wallet.</Heading>
      </VStack>
      <VStack w="50vw" p={4} spacing={4}>
        {wallets.map(({ name, img }) => {
          return (
            <Box
              as="button"
              p={3}
              w="full"
              borderWidth="2px"
              borderColor="base.border"
              display="flex"
              key={name}
              justifyContent="space-between"
              alignItems="center"
              _hover={{ shadow: "2xl", transform: "scale(1.1)" }}
              _focus={{ borderColor: "base.secondary" }}
            >
              <Image src={img} h="30px" w="30px" />
              <Heading size="sm">{name}</Heading>
            </Box>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default Login;
