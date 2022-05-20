import {
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import withAuth from "../src/components/withAuth";
import { useToken } from "../src/store/token";
import { fetcher } from "../src/utils/fetcher";

const NFTCard = React.lazy(() => import("../src/templates/NFTCard"));

const Profile = () => {
  const token = useToken(useCallback((state) => state.accessToken, []));
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    const data = await fetcher({ url: "like", method: "GET", token: token });
    console.log(data);
    if (data?.posts) {
      setPosts(data.posts);
    } else {
      console.error(data?.error);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container maxW="container.lg" h="100vh" pt={6}>
      <Heading size="md">Liked Posts</Heading>
      <VStack m={4}>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}>
          <Suspense fallback={<Spinner color="base.secondary" size="md" />}>
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

export default withAuth(Profile);
