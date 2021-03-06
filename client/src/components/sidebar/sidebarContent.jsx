import {
  Box,
  Flex,
  IconButton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FiHome, FiCompass, FiLogOut } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { useToken } from "../../store/token";
import { useStore } from "../../store/user";
import { NavItem } from "./navItem";
import { useWalletStore } from "../../store/walletStore";

const LinkItems = [
  { name: "Home", route: "/home", icon: FiHome },
  { name: "Explore", route: "/explore", icon: FiCompass },
  {
    name: "Notifications",
    route: "/notifications",
    icon: IoNotificationsOutline,
  },
];

export const SidebarContent = ({ onClose, ...rest }) => {
  const router = useRouter();

  const removeAccessToken = useToken(
    useCallback((state) => state.removeAccessToken, [])
  );
  const removeUser = useStore(useCallback((state) => state.removeUser, []));
  const removeWallet = useWalletStore(
    useCallback((state) => state.removeWallet, [])
  );

  const logout = () => {
    router.push("/");
    removeAccessToken();
    removeUser();
    removeWallet();
  };

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
          <NavItem
            key={index}
            label={link.name}
            icon={link.icon}
            route={link.route}
          />
        ))}
        <Tooltip label="Logout" fontSize="md" bg="white" color="black">
          <IconButton
            mt="4"
            bgColor="white"
            aria-label="Logout"
            icon={<FiLogOut mr="4" fontSize="24" />}
            _hover={{
              bg: "base.secondary",
              color: "white",
            }}
            onClick={logout}
          />
        </Tooltip>
      </Flex>
    </Box>
  );
};
