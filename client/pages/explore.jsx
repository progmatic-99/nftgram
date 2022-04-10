import React, { useState } from "react";
import Collection from "../src/components/collection";

const Explore = ({ data }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  setPosts((prevPosts) => [...prevPosts, ...data.bundles]);

  const loadMore = async () => {
    try {
      const data = await fetch(
        "https://api.opensea.io/api/v1/assets?order_direction=desc&limit=10&include_orders=false",
        { method: "GET" }
      ).then((res) => res.json());

      setPosts((prevPosts) => [...prevPosts, ...data.bundles]);
    } catch (err) {
      setErrMsg(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Collection bundles={posts.assets} />
      {errMsg && <p>{errMsg}</p>}
      <button onClick={loadMore}>
        {isLoading ? "Loading...." : "Load More!!"}
      </button>
    </>
  );
};

export default Explore;

export async function getStaticProps() {
  const data = await fetch(
    "https://api.opensea.io/api/v1/assets?order_direction=desc&limit=8&include_orders=false",
    { method: "GET" }
  ).then((res) => res.json());

  return { props: { data }, revalidate: 60 * 60 * 1000 };
}
