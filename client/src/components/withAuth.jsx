import { useRouter } from "next/router";
import { useEffect } from "react";
import { useToken } from "../store/token";
import { verifyToken } from "../utils/verifyToken";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const accessToken = useToken((state) => state.accessToken);

    useEffect((accessToken) => {
      console.log('in use effect')
      if (!accessToken) {
        console.log('access token null');
        Router.replace("/login");
        return;
      }
    }, []);

    if (accessToken && verifyToken(accessToken)) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
