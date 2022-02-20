import { Box, Heading, Image, useToast, VStack } from "@chakra-ui/react";
import React from "react";
import { connectMetamask, connectPhantom } from "../src/utils/login";

const wallets = [
  { name: "MetaMask", img: "/metamask.webp", login: connectMetamask },
  { name: "Phantom", img: "/phantom.webp", login: connectPhantom },
];

const Login = () => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });

  const connectWallet = async (name, login) => {
    try {
      await login();

      return toast({
        title: `${name} Wallet Connected!!`,
        status: "success",
      });
    } catch (err) {
      console.error(err);
      return toast({
        title: "Connection failed!!",
        status: "error",
        description: `Please install ${name}!!`,
      });
    }
  };

  return (
    <VStack spacing={4} h="100vh" align="center" pt={8}>
      <VStack>
        <Heading>Connect your wallet.</Heading>
      </VStack>
      <VStack w="50vw" p={4} spacing={4}>
        {wallets.map(({ name, img, login }) => {
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
              onClick={() => connectWallet(name, login)}
              _hover={{ shadow: "2xl", transform: "scale(1.1)" }}
              _focus={{ borderColor: "base.secondary" }}
            >
              <Image src={img} alt="Wallet Image" h="30px" w="30px" />
              <Heading size="sm">{name}</Heading>
            </Box>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default Login;
