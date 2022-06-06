import {
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
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
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
    } else {
      console.error(data?.error);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container maxW="container.lg" pt={6}>
      <Heading color="black">Liked Posts</Heading>
      <VStack m={4}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 10 }}>
          <Suspense fallback={<Spinner color="base.secondary" size="xl" />}>
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
    </Container>
  );
};

export default Details;
