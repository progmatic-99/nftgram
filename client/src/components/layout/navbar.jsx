import {
  Link,
  HStack,
  Image,
  Container,
  Heading,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useToken } from "../../store/token";
import { useStore } from "../../store/user";

const pages = {
  "/signup": "Signup",
  "/login": "Login",
};

const Navbar = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const user = useStore((state) => state.user);
  const removeUser = useStore(useCallback((state) => state.removeUser, []));
  const removeAccessToken = useToken(
    useCallback((state) => state.removeAccessToken, [])
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const logout = () => {
    removeAccessToken();
    removeUser();
    Router.push("/");
  };

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
        <HStack
          align="center"
          spacing={{ base: 6, md: 4 }}
          mr={{ base: 0, lg: 10 }}
        >
          {hasMounted && user && (
            <Button bgColor="white" onClick={logout}>
              Logout
            </Button>
          )}
          {hasMounted &&
            !user &&
            Object.entries(pages).map(([route, value], index) => {
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
