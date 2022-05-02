import { Button, Container, SimpleGrid } from "@chakra-ui/react";
import React, { Suspense, useEffect } from "react";
import withAuth from "../src/components/withAuth";
import usePosts from "../src/hooks/posts";
import { Spinner } from "@chakra-ui/react";

const NFTCard = React.lazy(() => import("../src/templates/NFTCard"));

const Explore = () => {
  const { posts, isLoading, errMsg, nextPage, loadMore } = usePosts();

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <Container maxW="container.lg" p={8} centerContent>
      {errMsg && <p>{errMsg}</p>}

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
        {isLoading ? "Loading...." : "Load More!!"}
      </Button>
    </Container>
  );
};

export default Explore;
