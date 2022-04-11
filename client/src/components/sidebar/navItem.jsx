import { Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { Tooltip } from '@chakra-ui/react'

export const NavItem = ({ label, icon, children, ...rest }) => {

  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="3"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "base.secondary",
          color: "white",
        }}
        _active={{
          bg: "purple.500"
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