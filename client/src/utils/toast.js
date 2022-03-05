import { useToast } from "@chakra-ui/react";

export const toast = useToast({
  duration: 3000,
  isClosable: true,
  position: "bottom",
});
