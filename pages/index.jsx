import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const Index = () => {
  return (
    <Container maxW="container.lg" p={0}>
      <Flex
        h="100vh"
        align="center"
        direction={["column-reverse", "column-reverse", "row", "row"]}
      >
        <VStack
          align={["center", "center", "flex-start", "flex-start"]}
          w="full"
          h="full"
          py={[null, null, "20", "20"]}
          px={["12", "10", null, null]}
          spacing={["6", "8"]}
        >
          <Heading size="4xl">Qrator</Heading>
          <Text color="gray.500" fontWeight="bold" fontSize="md" noOfLines={4}>
            Instagram for NFT creators & lovers!!
            <br />
            Build your NFT portfolio. <br />
            Browse plethora of NFTs from different
            <br /> chains on our platform.
          </Text>
          <HStack spacing={8}>
            <NextLink href="/login" passHref>
              <Button as={Link} variant="primary" size="lg" alignSelf="center">
                Login
              </Button>
            </NextLink>
          </HStack>
        </VStack>
        <VStack w="full" h="full" align="center" p={["8", "6", null, null]}>
          <Box w="full" h="full">
            <Image
              w={["300px", "300px", "900px", "900px"]}
              h={["300px", "300px", "400px", "500px"]}
              borderWidth="1px"
              borderRadius="2xl"
              borderColor="base.border"
              src="/front.webp"
              alt="Front page NFT"
            />
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Index;
