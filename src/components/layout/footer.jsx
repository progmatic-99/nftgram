import {
  Divider,
  Icon,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <VStack pb={8} spacing={8}>
      <Divider borderColor="gray.500" />
      <SimpleGrid align="start" columns={{ base: 1, md: 1 }} w="full">
        <VStack align="center">
          <Link href="https://github.com/progmatic-99/nftgram" isExternal>
            Github repo
          </Link>
          <Link>Blog</Link>
          <Text>
            Developed with <Icon as={FaHeart} /> by{" "}
            <Link href="https://progmatic99.xyz" isExternal>
              progmatic99
            </Link>{" "}
          </Text>
        </VStack>
      </SimpleGrid>
    </VStack>
  );
};

export default Footer;
