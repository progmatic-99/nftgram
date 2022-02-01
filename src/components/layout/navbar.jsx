import { Link, HStack, Image, Container, Heading } from "@chakra-ui/react";
import NextLink from "next/link";

export const navLinks = [
  { href: "/login", label: "Sign In" },
  { href: "/signup", label: "Sign Up" },
];

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
      mb={6}
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
            <Image w="60px" h="60px" src="/logo.webp" />
          </Link>
        </NextLink>
        <HStack align="center" spacing={{ base: 6, md: 4 }}>
          {navLinks.map(({ href, label }) => {
            return (
              <NextLink key={href} href={href} passHref>
                <Link>
                  <Heading size="md">{label}</Heading>
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
