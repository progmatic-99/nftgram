import {
  Badge,
  Box,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

export default function NFTCard({ name, desc, img, opensea, project }) {
  return (
    <LinkBox
      maxW="sm"
      borderWidth="1px"
      borderColor="base.border"
      borderRadius="lg"
      overflow="hidden"
      shadow="lg"
      isExternal
    >
      <Image src={img} fallbackSrc="/fallback.webp" alt={name} />
      <Box p="6" w="full">
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Badge borderRadius="full" px="2" bg="base.secondary" color="white">
            OpenSea
          </Badge>
        </Box>
        <Box mt="2" fontWeight="bold">
          <LinkOverlay
            href={opensea}
            _hover={{ color: "base.secondary" }}
            isExternal
          >
            {name}
          </LinkOverlay>
        </Box>
        {desc && (
          <Text
            mt="2"
            letterSpacing="wide"
            fontWeight="bold"
            fontSize="sm"
            noOfLines={2}
          >
            {desc}
          </Text>
        )}
        <Box
          as="a"
          color="gray.600"
          display="flex"
          alignItems="center"
          mt="1"
          fontWeight="bold"
          href={project}
          isExternal
        >
          <Text>Project</Text>
          <FaExternalLinkSquareAlt mx="2" />
        </Box>
      </Box>
    </LinkBox>
  );
}
