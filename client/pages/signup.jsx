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
import { connectMetamask, connectPhantom } from "../src/api/login";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { fetcher } from "../src/utils/fetcher";

const wallets = [
  { name: "MetaMask", img: "/metamask.webp" },
  { name: "Phantom", img: "/phantom.webp" },
];

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [metamaskId, setMetamaskId] = useState("");
  const [phantomId, setPhantomId] = useState("");
  const router = useRouter();

  const toast = createStandaloneToast({
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });

  const connectWallet = async (name) => {
    try {
      if (name === "Metamask") {
        const account = await connectMetamask();
        setMetamaskId(account);
      } else {
        const account = await connectPhantom();
        setPhantomId(account);
      }

      return toast({
        title: `${name} Wallet Connected!!`,
        status: "success",
      });
    } catch (err) {
      console.error(err);
      return toast({
        title: "Connection failed!!",
        status: "error",
        description: `Please install ${name}!!`,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [data, err] = await fetcher({
      url: "signup",
      method: "POST",
      data: {
        email: email,
        password: password,
        metamask_id: metamaskId,
        phantom_id: phantomId,
      },
    });
    if (!err) {
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
        description: err,
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
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
              {wallets.map(({ name, img }, index) => {
                return (
                  <FormControl key={index}>
                    <FormLabel>Connect your {name} wallet!</FormLabel>
                    <InputGroup>
                      <Box
                        as="button"
                        p={3}
                        w="full"
                        borderWidth="2px"
                        borderColor="base.border"
                        display="flex"
                        key={name}
                        justifyContent="space-between"
                        alignItems="center"
                        onClick={() => connectWallet(name)}
                        _hover={{ shadow: "2xl", transform: "scale(1.1)" }}
                        _focus={{ borderColor: "base.secondary" }}
                      >
                        <Image src={img} alt="Wallet Image" h="30px" w="30px" />
                        <Heading size="sm">{name}</Heading>
                      </Box>
                    </InputGroup>
                  </FormControl>
                );
              })}
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
