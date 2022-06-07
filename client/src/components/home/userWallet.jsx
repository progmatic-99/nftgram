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
import { getWalletDetails } from "./wallet";

const UserWallet = () => {
  const token = useToken(useCallback((state) => state.accessToken, []));

  const [opensea, setOpensea] = useState("");
  const [rarible, setRarible] = useState("");

  const toast = createStandaloneToast({
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });

  const fetchDetails = useCallback(async () => {
    const wallet = await getWalletDetails(token);
    console.log(wallet);
    setOpensea(wallet.opensea);
    setRarible(wallet.rarible);
  }, []);

  useEffect(() => {
    if (opensea === "" || rarible === "") {
      fetchDetails();
    }
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
    <VStack
      pt={{ base: 6, md: 8 }}
      align={{ base: "center", md: "flex-start" }}
    >
      <form onSubmit={() => addWallet(opensea, rarible, token)}>
        <VStack spacing={6} p={3} justify="center">
          <Heading as="h3" variant="appName">
            Add your wallets!!
          </Heading>
          <VStack spacing={8}>
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
