import { Heading, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { OPENSEA_URL } from "../../utils/urls";
import useAllWallets from "./getAllWallets";

const NFTCard = React.lazy(() => import("../../templates/NFTCard"));

const UserFeed = () => {
  const [wallets] = useAllWallets();
  const [posts, setPosts] = useState([]);

  const getFeed = useCallback(async () => {
    console.log(wallets);
    wallets?.map(async (wallet) => {
      if (wallet?.opensea) {
        const data = await fetch(
          `${OPENSEA_URL}collections?asset_owner=${wallet.opensea}&limit=6`
        ).then((res) => res.json());

        setPosts(() => [...data]);
      }
    });
  }, [wallets]);

  useEffect(() => {
    getFeed();
  }, [wallets]);

  return (
    wallets && (
      <VStack maxW="100vw" spacing={6}>
        <Heading m={(8, 0, 8, 0)} variant="appName">
          User Feed
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 10 }}>
          {posts.map(
            ({
              name,
              id,
              image_url,
              permalink,
              asset_contract,
              description,
            }) => {
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
                    owner={wallets[0].opensea}
                  />
                </Suspense>
              );
            }
          )}
        </SimpleGrid>
      </VStack>
    )
  );
};

export default UserFeed;
