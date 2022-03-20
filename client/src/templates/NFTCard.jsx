import {
  Badge,
  Box,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

export default function NFTCard({ name, img, opensea, project }) {
  return (
    <LinkBox
      as="link"
      href={opensea}
      maxW="sm"
      borderWidth="1px"
      borderColor="base.border"
      borderRadius="lg"
      overflow="hidden"
      shadow="lg"
      isExternal
    >
      <Image src={img} alt={name} />
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="base.secondary">
            OpenSea
          </Badge>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h6"
            lineHeight="tight"
            isTruncated
          >
            {name}
          </Box>
        </Box>
        <Box>
          <LinkOverlay href={project} isExternal>
            Check out the project <FaExternalLinkSquareAlt mx="2px" />
          </LinkOverlay>
        </Box>
      </Box>
    </LinkBox>
  );
}
