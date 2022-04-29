import { Tooltip } from "@chakra-ui/react";
import React from "react";
import { BiAddToQueue } from "react-icons/bi";

const AddToLike = () => {
  return (
    <Tooltip label="Add to liked posts" fontSize="md">
      <BiAddToQueue />
    </Tooltip>
  );
};

export default AddToLike;
