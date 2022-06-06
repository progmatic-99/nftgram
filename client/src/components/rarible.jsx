import { Heading, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import React, { Suspense, useEffect } from "react";
import useRarible from "../hooks/useRarible";

const NFTCard = React.lazy(() => import("../templates/NFTCard"));

const Rarible = ({ chain }) => {
  const { posts, loadPosts } = useRarible(chain);

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <VStack maxW="100vw" spacing={5}>
      <Heading variant="sol">{chain}</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 10 }}>
        {posts.map(({ meta }, index) => {
          return (
            <Suspense
              key={index}
              fallback={<Spinner color="base.secondary" size="md" />}
            >
              <NFTCard
                desc={meta.description}
                img={meta.content[0].url}
                name={meta.name}
                marketplace="Rarible"
              />
            </Suspense>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};

export default Rarible;
