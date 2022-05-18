import { useCallback, useRef, useState } from "react";
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
  const addUser = useStore(useCallback((state) => state.addUser, []));
  const addAccessToken = useToken(
    useCallback((state) => state.addAccessToken, [])
  );
  const emailRef = useRef();
  const passwordRef = useRef();

  const addCredentials = useCallback(() => {
    const defaultEmail = process.env.EMAIL;
    const defaultPassword = process.env.PASS;

    emailRef.current.value = defaultEmail;
    passwordRef.current.value = defaultPassword;

    setPassword(defaultPassword);
    setEmail(defaultEmail);
  }, []);

  const toast = createStandaloneToast({
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetcher({
      url: "login",
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    });

    if (data?.error) {
      console.error(err);

      toast({
        title: "Login failed!!",
        status: "error",
        description: data.error,
      });
    } else {
      setEmail("");
      setPassword("");

      addAccessToken(data.accessToken);

      const user = jwt.decode(data.accessToken);
      addUser(user);

      toast({
        title: "Login succesfull!!",
        status: "success",
        description: "Browse your favourite NFTs!!",
      });
      router.push("/profile");
    }
  };

  return (
    <Flex minH={"100vh"} align={"flex-start"} justify={"center"}>
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
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    ref={passwordRef}
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
              <Stack spacing={4} pt={2}>
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
                <Button
                  onClick={addCredentials}
                  loadingText="Wait!!"
                  size="lg"
                  bg="gray.500"
                  color="white"
                  _hover={{
                    bg: "white",
                    color: "black",
                  }}
                >
                  Use default login
                </Button>
              </Stack>
              <Stack pt={4}>
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
