import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Link,
  FormControl,
  FormLabel,
  InputRightElement,
  Text,
  useColorModeValue,
  createStandaloneToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useStore } from "../src/store/user";
import { useToken } from "../src/store/token";
import { fetcher } from "../src/utils/fetcher";
import jwt from "jsonwebtoken";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const addUser = useStore((state) => state.addUser);
  const addAccessToken = useToken((state) => state.addAccessToken);
  const addRefreshToken = useToken((state) => state.addRefreshToken);

  const toast = createStandaloneToast({
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [data, err] = await fetcher({
      url: "login",
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    });
    if (!err) {
      setEmail("");
      setPassword("");

      addAccessToken(data.accessToken);

      const user = jwt.decode(data.accessToken);
      addUser(user);

      toast({
        title: "Login succesfull!!",
        status: "success",
        description: "Please login with your credentials!!",
      });
      router.push("/profile");
    } else {
      console.error(err);

      toast({
        title: "Login failed!!",
        status: "error",
        description: err,
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"flex-start"}
      justify={"center"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Log In
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to browse NFTs from different chains ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "base.primary")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement w="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      bg="gray.200"
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  type="submit"
                  bg="base.secondary"
                  color="base.primary"
                  _hover={{
                    bg: "base.border",
                    color: "white",
                  }}
                >
                  Log in
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  New here ?{" "}
                  <NextLink href="/signup" passHref>
                    <Link color={"blue.400"}>Signup</Link>
                  </NextLink>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
