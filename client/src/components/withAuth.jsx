import { useRouter } from "next/router";
import { useEffect } from "react";
import { useToken } from "../store/token";
import { verifyToken } from "../utils/verifyToken";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const accessToken = useToken((state) => state.accessToken);

    useEffect((accessToken) => {
      console.log(accessToken);
      if (!accessToken) {
        Router.replace("/login");
      }
    }, []);

    if (verifyToken(accessToken)) {
      return <WrappedComponent {...props} />;
    } else {
      Router.replace("/login");
    }
  };
};

export default withAuth;
