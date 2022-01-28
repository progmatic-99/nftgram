import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Index = () => {
  return (
    <Container maxW="container.lg" p={0}>
      <Flex
        h="100vh"
        py={3}
        direction={["column-reverse", "column-reverse", "row", "row"]}
      >
        <VStack align="flex-start" w="full" h="full" py={20} spacing={8}>
          <Heading size="4xl">Qrator</Heading>
          <Text color="gray.500" fontSize="xl" noOfLines={4}>
            Build your NFT portfolio. Browse plethora of NFTs from different
            chains on 1 platform.
          </Text>
        </VStack>
        <VStack w="full" h="full" p={4} spacing={10}>
          <Box
            w="full"
            h="full"
            borderWidth="1px"
            borderRadius="2xl"
            borderColor="base.border"
            overflow="hidden"
          >
            <Image src="/front.webp" alt="Front page NFT" w="full" h="full" />
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Index;
