import React from "react";
import { Heading, HStack, VStack, Image, Text, Link } from "@chakra-ui/react";

const Notification = ({ user, post_name, img_link, opensea_link }) => {
  return (
    <HStack w="container.md" border="1px solid black">
      <Image size="md" src={img_link} fallbackSrc="/fallback.webp" />
      <VStack align="center" justify="center">
        <Heading as="h3" fontSize="24px" color="base.primary">
          Your post {post_name}{" "}
          {user ? "was liked by `${user}`." : "was liked by someone."}{" "}
        </Heading>
        {opensea_link && (
          <Text color="base.primary">
            Check it out on{" "}
            <Link color="base.secondary" href={opensea_link}>
              Opensea.
            </Link>
          </Text>
        )}
      </VStack>
    </HStack>
  );
};

export default Notification;
