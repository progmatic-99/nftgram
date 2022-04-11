import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiCompass, FiSettings } from "react-icons/fi";
import { NavItem } from "./navItem";

const LinkItems = [
  { name: "Home", route: "/home", icon: FiHome },
  { name: "Explore", route: "/explore", icon: FiCompass },
  { name: "Profile", route: "/profile", icon: FiSettings },
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
          <NavItem key={index} label={link.name} icon={link.icon} route={link.route} />
        ))}
      </Flex>
    </Box>
  );
};
