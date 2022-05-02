import { useCallback, useState } from "react";

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [nextPage, setNextPage] = useState("");

  const loadMore = useCallback(async (cursor = "") => {
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
  }, []);

  return { posts, isLoading, errMsg, nextPage, loadMore };
}
