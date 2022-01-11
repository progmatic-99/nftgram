import { Box, Flex, HStack, Image, Spacer } from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <Box w="100%">
      <Flex alignItems="center">
        <Link href="/">
          <Box as="button">
            <Image />
          </Box>
        </Link>
        <Spacer />
        <HStack>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
