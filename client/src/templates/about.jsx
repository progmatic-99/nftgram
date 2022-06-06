import { Container, Heading } from "@chakra-ui/react";
import React from "react";
import Collection from "../components/collection";

const About = ({ assets }) => {
  return (
    <Container maxW="container.lg" minH="50vh" pb={8}>
      <Heading
        as="h4"
        fontWeight="light"
        textAlign="center"
        textColor="base.primary"
        pt={16}
        pb={12}
      >
        Browse plethora of NFTs...
      </Heading>

      <Collection bundles={assets} />
    </Container>
  );
};

export default About;
