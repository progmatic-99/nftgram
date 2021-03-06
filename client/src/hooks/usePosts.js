import { useCallback, useState } from "react";
import { OPENSEA_URL } from "../utils/urls";

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [nextPage, setNextPage] = useState("");

  const loadMore = useCallback(async (cursor = "") => {
    const URL = `${OPENSEA_URL}assets?order_direction=desc&limit=9&include_orders=false`;
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
      console.error(err);
    }
  }, []);

  return { posts, nextPage, loadMore };
}
