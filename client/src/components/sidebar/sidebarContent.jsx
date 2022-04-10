import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiCompass, FiSettings } from "react-icons/fi";
import { NavItem } from "./navItem";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Explore", icon: FiCompass },
  { name: "Profile", icon: FiSettings },
];

export const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w="5rem"
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        my="5rem"
        direction="column"
        alignContent="center"
        justifyContent="space-between"
      >
        {LinkItems.map((link, index) => (
          <NavItem key={index} label={link.name} icon={link.icon} />
        ))}
      </Flex>
    </Box>
  );
};
