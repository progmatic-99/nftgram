import { useRouter } from "next/router";
import { useEffect } from "react";
import { useToken } from "../store/token";
import { verifyToken } from "../utils/verifyToken";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const accessToken = useToken((state) => state.accessToken);

    useEffect(() => {
      if (accessToken && verifyToken(accessToken)) {
        return <WrappedComponent {...props} />;
      }

      if (accessToken && !verifyToken(accessToken)) {
        window.localStorage.clear("token");
        window.localStorage.clear("user");
      }

      Router.replace("/login");
    }, []);

    return null;
  };
};

export default withAuth;
