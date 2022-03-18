import React from "react";
import {
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { SidebarContent } from "./sidebarContent";

export default function Index() {

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        display={{ base: "block" }}
      />
    </Box>
  );
}
