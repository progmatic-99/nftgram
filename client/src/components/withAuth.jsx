import { useRouter } from "next/router";

import React from "react";

const withAuth = (fn) => {
  return async (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        router.push("/login");
        return null;
      }

      const user = await fetcher("user", "GET", (token = accessToken));
      if (!user) {
        router.push("/login");
        return null;
      }

      return fn(props);
    }

    return null;
  };
};

export default withAuth;
