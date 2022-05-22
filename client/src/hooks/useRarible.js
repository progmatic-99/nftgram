import React, { useCallback, useState } from "react";
import { RARIBLE_URL } from "../utils/urls";

const useRarible = (chain = "SOLANA") => {
  const [posts, setPosts] = useState([]);

  const loadPosts = useCallback(async () => {
    try {
      const data = await fetch(
        `${RARIBLE_URL}items/all?blockchains=${chain}&size=6&showDeleted=false`
      ).then((res) => res.json());

      setPosts((prevPosts) => [...prevPosts, ...data.items]);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return { posts, loadPosts };
};

export default useRarible;
