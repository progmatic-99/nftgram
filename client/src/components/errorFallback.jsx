import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";

const ErrorFallback = ({ error }) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="400px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Something went wrong!!
      </AlertTitle>
      <AlertDescription maxWidth="md">{error.message}</AlertDescription>
    </Alert>
  );
};

export default ErrorFallback;
