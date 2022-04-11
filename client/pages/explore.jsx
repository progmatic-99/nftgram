import { Button, Container, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NFTCard from "../src/templates/NFTCard";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [nextPage, setNextPage] = useState("");

  const loadMore = async (cursor = "") => {
    const URL =
      "https://api.opensea.io/api/v1/assets?order_direction=desc&limit=9&include_orders=false";
    if (cursor) {
      URL = URL + `&cursor=${cursor}`;
    }
    try {
      const data = await fetch(URL, { method: "GET" }).then((res) =>
        res.json()
      );
      const cursor = data.next;

      setNextPage(cursor);
      setPosts((prevPosts) => [...prevPosts, ...data.assets]);
    } catch (err) {
      setErrMsg(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <Container maxW="container.lg" p={8} centerContent>
      {errMsg && <p>{errMsg}</p>}
      {isLoading && (
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}>
          <Skeleton h="300px" w="300px" />
          <Skeleton h="300px" w="300px" />
          <Skeleton h="300px" w="300px" />
        </SimpleGrid>
      )}
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}>
        {posts.map(
          ({ name, id, image_url, permalink, asset_contract, description }) => {
            return (
              <NFTCard
                desc={description}
                img={image_url}
                name={name}
                key={id}
                opensea={permalink}
                project={asset_contract.external_link}
              />
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
