import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { navLinks } from "../src/components/layout/navbar";

const Index = () => {
  return (
    <Container maxW="container.lg" p={0}>
      <Flex
        h="100vh"
        py={3}
        align="center"
        direction={["column-reverse", "column-reverse", "row", "row"]}
      >
        <VStack
          align={["center"]}
          w="full"
          h="full"
          py={[null, null, "20", "20"]}
          spacing={8}
        >
          <Heading size="4xl">Qrator</Heading>
          <Text color="gray.500" fontSize="xl" noOfLines={4}>
            Build your NFT portfolio. <br />
            Browse plethora of NFTs from different chains on
            <br /> 1 platform.
          </Text>
          {/* {navLinks.map(({ href, label }) => {
            return (
              <Button size="lg" key={href}>
                {label}
              </Button>
            );
          })} */}
        </VStack>
        <VStack
          align="center"
          w={["450px", "450px", "900px", "900px"]}
          h={["450px", "450px", "500px", "500px"]}
          p={["8", "8", "2", "2"]}
        >
          <Box
            w="full"
            h="full"
            borderWidth="1px"
            borderRadius="2xl"
            borderColor="base.border"
          >
            <Image src="/front.webp" alt="Front page NFT" w="full" h="full" />
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Index;
