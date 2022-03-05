import { Link, HStack, Image, Container, Heading } from "@chakra-ui/react";
import NextLink from "next/link";

const pages = {
  "/signup": "Signup",
  "/login": "Login",
};

const Navbar = () => {
  return (
    <HStack
      as="nav"
      position="sticky"
      top={0}
      insetX={0}
      zIndex="overlay"
      bg="white"
      justifyContent="space-around"
      alignItems="center"
      w="full"
      py={3}
      // mb={6}
      borderBottom="1px solid #a9b2bf"
    >
      <Container
        display="flex"
        maxW="container.lg"
        align="center"
        justifyContent="space-between"
        px={{ base: 4, lg: 0 }}
      >
        <NextLink href="/" passHref>
          <Link>
            <Image w="60px" h="60px" alt="Qrator logo" src="/logo.webp" />
          </Link>
        </NextLink>
        {/* <Spacer /> */}
        <HStack align="center" spacing={{ base: 6, md: 4 }} mr={10}>
          {Object.entries(pages).map(([route, value], index) => {
            return (
              <NextLink href={route} key={index} passHref>
                <Link>
                  <Heading size="md">{value}</Heading>
                </Link>
              </NextLink>
            );
          })}
        </HStack>
      </Container>
    </HStack>
  );
};

export default Navbar;
