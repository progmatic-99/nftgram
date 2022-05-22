import { Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const NavItem = ({ label, icon, children, route, ...rest }) => {
  const router = useRouter();

  return (
    <Link
      href={route}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="3"
        bgColor={router.pathname === route ? "base.secondary" : ""}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "base.secondary",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Tooltip label={label} fontSize="md" bg="white" color="black">
            <span>
              <Icon
                mr="4"
                fontSize="24"
                _groupHover={{
                  color: "white",
                }}
                as={icon}
              />
            </span>
          </Tooltip>
        )}
        {children}
      </Flex>
    </Link>
  );
};
