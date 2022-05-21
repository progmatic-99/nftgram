import React from "react";
import useRarible from "../hooks/useRarible";

const Rarible = (chain) => {
  const posts = useRarible(chain);

  return (
    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}>
      {posts.map(({ meta, id, content }) => {
        return (
          <Suspense
            key={id}
            fallback={<Spinner color="base.secondary" size="md" />}
          >
            <NFTCard
              desc={meta.description}
              img={content.url}
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
