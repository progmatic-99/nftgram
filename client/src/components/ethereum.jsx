import { Button, SimpleGrid, Spinner } from "@chakra-ui/react";
import React, { Suspense, useEffect } from "react";
import usePosts from "../hooks/usePosts";

const NFTCard = React.lazy(() => import("../templates/NFTCard"));

const Ethereum = () => {
  const { posts, nextPage, loadMore } = usePosts();

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}>
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
    </>
  );
};

export default Ethereum;
