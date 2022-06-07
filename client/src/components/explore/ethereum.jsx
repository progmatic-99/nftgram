import { Button, Heading, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import React, { Suspense, useEffect } from "react";
import usePosts from "../../hooks/usePosts";

const NFTCard = React.lazy(() => import("../../templates/NFTCard"));

const Ethereum = () => {
  const { posts, nextPage, loadMore } = usePosts();

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <VStack maxW="100vw" spacing={6}>
      <Heading m={(8, 0, 8, 0)} variant="eth">
        ETHEREUM
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 10 }}>
        {posts.map(
          ({ name, id, image_url, permalink, asset_contract, description }) => {
            return (
              <Suspense
                key={id}
                fallback={<Spinner color="base.secondary" size="md" />}
              >
                <NFTCard
                  desc={description}
                  img={image_url}
                  name={name}
                  opensea={permalink}
                  project={asset_contract.external_link}
                />
              </Suspense>
            );
          }
        )}
      </SimpleGrid>

      <Button
        variant="secondary"
        onClick={() => loadMore(nextPage)}
        mt={6}
        alignSelf="center"
      >
        Load More!!
      </Button>
    </VStack>
  );
};

export default Ethereum;
