import {
  Alert,
  AlertIcon,
  Button,
  Container,
  createStandaloneToast,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useToken } from "../../store/token";
import { useStore } from "../../store/user";
import { getWalletDetails } from "./wallet";

const UserWallet = () => {
  const user = useStore(useCallback((state) => state.user, []));
  const token = useToken(useCallback((state) => state.accessToken, []));

  const [opensea, setOpensea] = useState(user.opensea ?? "");
  const [rarible, setRarible] = useState(user.rarible ?? "");

  const toast = createStandaloneToast({
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });

  useEffect(() => {
    async function fetchDetails() {
      const wallet = await getWalletDetails(token);
      console.log(wallet);
      setOpensea(wallet.opensea);
      setRarible(wallet.rarible);
    }

    fetchDetails();
  }, []);

  async function addWallet(opensea, rarible, token) {
    const res = await fetcher({
      url: "wallet",
      method: "POST",
      token: token,
      data: {
        opensea: opensea,
        rarible: rarible,
      },
    });

    if (res.msg) {
      toast({
        title: res.msg,
        status: "success",
        description: "Now your NFTs would be on feed!!",
      });
    } else {
      toast({
        title: "Wallet not added!!",
        status: "error",
        description: res.error,
      });
    }
  }

  return (
    <Container maxW="container.lg" pt={8}>
      <Alert
        mt={4}
        mb={6}
        status="info"
        variant="subtle"
        boxSize="xl"
        h="100px"
        bg="gray.100"
        borderRadius={8}
      >
        <AlertIcon color="base.primary" />
        <Text noOfLines={2} fontWeight="bolder">
          After you add your wallet, your NFTs will be available in the feed.
          You can add any one or both wallets.
        </Text>
      </Alert>
      <form onSubmit={() => addWallet(opensea, rarible, token)}>
        <VStack spacing={6} align="flex-start">
          <Heading size="xl" variant="appName">
            Add your wallets!!
          </Heading>
          <HStack spacing={12}>
            <FormControl id="opensea" isRequired>
              <FormLabel fontWeight="bold">Opensea Wallet</FormLabel>
              <Input
                type="text"
                value={opensea}
                onChange={(e) => setOpensea(e.target.value)}
              />
            </FormControl>
            <FormControl id="rarible" isRequired>
              <FormLabel fontWeight="bold">Rarible Wallet</FormLabel>
              <Input
                type="text"
                value={rarible}
                onChange={(e) => setRarible(e.target.value)}
              />
            </FormControl>
          </HStack>
          <Button
            type="submit"
            bg="base.secondary"
            color="white"
            _hover={{
              bg: "black",
            }}
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UserWallet;
