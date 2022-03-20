import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import NFTCard from "./NFTCard";

const About = ({ assets }) => {
  return (
    <Container maxW="container.lg" minH="50vh" pb={8}>
      <Heading
        as="h4"
        fontWeight="light"
        textAlign="center"
        textColor="base.primary"
        pb={8}
      >
        Browse plethora of NFTs...
      </Heading>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}>
        {assets.map(({ assets }) => {
          return assets.map(
            ({
              name,
              image_url,
              id,
              permalink: openseaLink,
              external_link: projectLink,
            }) => {
              return (
                <NFTCard
                  img={image_url}
                  name={name}
                  key={id}
                  opensea={openseaLink}
                  project={projectLink}
                />
              );
            }
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default About;
