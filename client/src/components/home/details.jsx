import { Heading, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useToken } from "../../store/token";
import { fetcher } from "../../utils/fetcher";

const NFTCard = React.lazy(() => import("../../templates/NFTCard"));

const Details = () => {
  const token = useToken(useCallback((state) => state.accessToken, []));
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    const data = await fetcher({ url: "like", method: "GET", token: token });

    if (data?.posts) {
      setPosts(() => [...data.posts]);
    } else {
      console.error(data?.error);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <VStack
      pt={6}
      pb={10}
      align={{ base: "center", md: "flex-start" }}
      spacing={4}
      minH="100vh"
    >
      <Heading as="h3" variant="like">
        Liked Posts
      </Heading>
      <VStack p={6} justify="center">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 10 }}>
          <Suspense fallback={<Spinner color="base.secondary" size="lg" />}>
            {posts.map(({ name, desc, img, project_link, opensea_link }) => {
              return (
                <NFTCard
                  key={img}
                  desc={desc}
                  img={img}
                  name={name}
                  opensea={opensea_link}
                  project={project_link}
                />
              );
            })}
          </Suspense>
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default Details;
