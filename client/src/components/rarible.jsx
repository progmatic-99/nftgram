import { SimpleGrid, Spinner } from "@chakra-ui/react";
import React, { Suspense, useEffect } from "react";
import useRarible from "../hooks/useRarible";

const NFTCard = React.lazy(() => import("../templates/NFTCard"));

const Rarible = ({ chain }) => {
  const { posts, loadPosts } = useRarible(chain);

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}>
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
  );
};

export default Rarible;
