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

export const Main = () => {
  return (
    <Container maxW="container.lg" p={0}>
      <Flex
        maxH="100vh"
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
          <Heading size="4xl" variant="appName">
            Qrator
          </Heading>
          <Text color="gray.500" fontWeight="bold" fontSize="lg" noOfLines={4}>
            Instagram for NFT creators & lovers!!
            <br />
            Build your NFT portfolio. <br />
          </Text>
          <HStack spacing={8}>
            <NextLink href="/login" passHref>
              <Button as={Link} variant="primary" size="lg" alignSelf="center">
                Login
              </Button>
            </NextLink>
            <NextLink href="/signup" passHref>
              <Button
                as={Link}
                variant="secondary"
                size="lg"
                alignSelf="center"
              >
                Signup
              </Button>
            </NextLink>
          </HStack>
        </VStack>
        <VStack w="full" h="full" p={["8", "6", null, null]}>
          <Box w="full" h="full" align="center">
            <Image
              boxShadow="dark-lg"
              w={["300px", "300px", "900px", "900px"]}
              h={["300px", "300px", "400px", "500px"]}
              border="10px"
              borderRadius="2xl"
              borderColor="black"
              src="/front.webp"
              alt="Front page NFT"
            />
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
};
