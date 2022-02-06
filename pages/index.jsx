import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
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
        py={2}
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
          <Text color="gray.500" fontWeight="bold" fontSize="xl" noOfLines={4}>
            Build your NFT portfolio. <br />
            Browse plethora of NFTs from different
            <br /> chains on our platform.
          </Text>
          <HStack spacing={8}>
            {navLinks.map(({ href, label }) => {
              return (
                <Button
                  variant={href === "/login" ? "primary" : "secondary"}
                  size="lg"
                  alignSelf="center"
                  key={href}
                >
                  {label}
                </Button>
              );
            })}
          </HStack>
        </VStack>
        <VStack
          align="center"
          w={["300px", "300px", "900px", "900px"]}
          h={["300px", "300px", "500px", "500px"]}
          p={["8", "6", "2", "2"]}
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
