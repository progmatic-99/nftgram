import { Flex } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";

const UserLayout = ({ children }) => {
  return (
    <Flex minW="100%">
      <Sidebar />
      {children}
    </Flex>
  );
};

export default UserLayout;
