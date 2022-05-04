import {
  Badge,
  Box,
  createStandaloneToast,
  HStack,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { BiAddToQueue } from "react-icons/bi";
import { useStore } from "../store/user";
import { useToken } from "../store/token";
import { useCallback, useMemo } from "react";

export default function NFTCard({ name, desc, img, opensea, project }) {
  const user = useStore(useCallback((state) => state.user, []));
  const token = useToken(useCallback((state) => state.accessToken, []));
  const toast = createStandaloneToast({
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });

  const addToLike = async ({ name, desc, img, opensea, project, token }) => {
    const [data, err] = await fetcher("like", "POST", token, {
      name: name,
      desc: desc,
      img: img,
      opensea_link: opensea,
      project_link: project,
    });

    if (data) {
      toast({
        title: "Done!!",
        status: "success",
        description: data.msg,
      });
    }

    toast({
      title: "Not able to add to Liked Posts!!",
      status: "error",
      description: err,
    });
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderColor="base.border"
      borderRadius="lg"
      overflow="hidden"
      shadow="lg"
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
        <LinkBox mt="2" fontWeight="bold">
          <LinkOverlay
            href={opensea}
            _hover={{ color: "base.secondary" }}
            isExternal
          >
            {name}
          </LinkOverlay>
        </LinkBox>
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
        <HStack justifyContent="space-between" mt={2}>
          <LinkBox
            color="gray.600"
            display="flex"
            alignItems="center"
            mt="1"
            fontWeight="bold"
          >
            <LinkOverlay
              href={project}
              _hover={{ color: "base.secondary" }}
              isExternal
            >
              Project
            </LinkOverlay>
            <FaExternalLinkSquareAlt mx="2" />
          </LinkBox>

          {user && (
            <Tooltip label="Add to Liked Posts!!">
              <IconButton
                aria-label="Like Button"
                icon={<BiAddToQueue />}
                variant="outline"
                onClick={addToLike}
                _hover={{ bgColor: "base.secondary", color: "white" }}
              />
            </Tooltip>
          )}
        </HStack>
      </Box>
    </Box>
  );
}
