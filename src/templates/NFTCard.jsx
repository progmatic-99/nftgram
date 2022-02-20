import { Box, Image } from "@chakra-ui/react";

export default function NFTCard({ name, img }) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderColor="base.border"
      borderRadius="lg"
      overflow="hidden"
      shadow="lg"
    >
      <Image src={img} alt={name} />
      <Box p="6">
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
    </Box>
  );
}
