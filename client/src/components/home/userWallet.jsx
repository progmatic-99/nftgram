import {
  Button,
  createStandaloneToast,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useToken } from "../../store/token";
import { useWalletStore } from "../../store/walletStore";
import { getWalletDetails } from "./wallet";

const UserWallet = () => {
  const token = useToken(useCallback((state) => state.accessToken, []));
  const wallet = useWalletStore(useCallback((state) => state.wallet, []));
  const addWallet = useWalletStore(useCallback((state) => state.addWallet, []));

  const toast = createStandaloneToast({
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });

  const fetchDetails = useCallback(async () => {
    const wallet = await getWalletDetails(token);
    addWallet(wallet);
  }, []);

  useEffect(() => {
    if (!wallet) {
      fetchDetails();
    }
  }, []);

  async function postWallet(opensea, rarible, token) {
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
    <VStack
      pt={{ base: 6, md: 8 }}
      align={{ base: "center", md: "flex-start" }}
    >
      <form onSubmit={() => postWallet(opensea, rarible, token)}>
        <VStack spacing={6} p={3} justify="center">
          <Heading as="h3" variant="appName">
            Add your wallets!!
          </Heading>
          <VStack spacing={8}>
            <FormControl id="opensea" isRequired>
              <FormLabel fontWeight="bold">Opensea Wallet</FormLabel>
              <Input
                type="text"
                value={wallet?.opensea ?? ""}
                onChange={(e) => setOpensea(e.target.value)}
              />
            </FormControl>
            <FormControl id="rarible" isRequired>
              <FormLabel fontWeight="bold">Rarible Wallet</FormLabel>
              <Input
                type="text"
                value={wallet?.rarible ?? ""}
                onChange={(e) => setRarible(e.target.value)}
              />
            </FormControl>
          </VStack>
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
    </VStack>
  );
};

export default UserWallet;
