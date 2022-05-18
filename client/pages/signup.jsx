import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  createStandaloneToast,
} from "@chakra-ui/react";
import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { fetcher } from "../src/utils/fetcher";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const toast = createStandaloneToast({
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetcher({
      url: "signup",
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    });
    if (!data?.error) {
      router.push("/login");
      return toast({
        title: data.message,
        status: "success",
        description: "Please login with your credentials!!",
      });
    } else {
      return toast({
        title: "Account creation failed!!",
        status: "error",
        description: data.error,
      });
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
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
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <NextLink href="/login" passHref>
                    <Link color={"blue.400"}>Login</Link>
                  </NextLink>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
