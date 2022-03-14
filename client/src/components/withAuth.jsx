import { fetcher } from "../utils/fetcher";

const withAuth = (gssp) => {
  return async (ctx) => {
    console.log(typeof window);
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        return {
          redirect: {
            destination: "/login",
          },
        };
      }

      ctx.accessToken = accessToken;
    }
    return await gssp(ctx);
  };
};

export default withAuth;
