import { Heading, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { fetcher } from "../../utils/fetcher";
import { OPENSEA_URL } from "../../utils/urls";

const NFTCard = React.lazy(() => import("../../templates/NFTCard"));

const UserFeed = () => {
  const [posts, setPosts] = useState([]);

  const getFeed = useCallback(async () => {
    try {
      const resp = await fetcher({ url: "wallets", method: "GET" });

      if (resp?.wallets) {
        resp.wallets.map(async (wallet) => {
          if (wallet?.opensea) {
            const data = await fetch(
              `${OPENSEA_URL}collections?asset_owner=${wallet.opensea}&limit=6`
            ).then((res) => res.json());

            setPosts((prevPosts) => [...prevPosts, ...data]);
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <VStack maxW="100vw" spacing={6}>
      <Heading m={(8, 0, 8, 0)} variant="appName">
        User Feed
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
                  project={asset_contract?.external_link}
                />
              </Suspense>
            );
          }
        )}
      </SimpleGrid>
    </VStack>
  );
};

export default UserFeed;
