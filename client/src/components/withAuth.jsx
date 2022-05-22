import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useToken } from "../store/token";
import { useStore } from "../store/user";
import { verifyToken } from "../utils/verifyToken";
import UserLayout from "./userLayout";

export default function withAuth(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const Router = useRouter();
    const accessToken = useToken(useCallback((state) => state.accessToken, []));

    const removeUser = useStore(useCallback((state) => state.removeUser, []));
    const removeAccessToken = useToken(
      useCallback((state) => state.removeAccessToken, [])
    );

    useEffect(() => {
      if (!accessToken) {
        Router.replace("/login");
        return;
      }
    }, []);

    if (accessToken && verifyToken(accessToken)) {
      return (
        <UserLayout>
          <WrappedComponent {...props} />
        </UserLayout>
      );
    } else if (!verifyToken(accessToken)) {
      removeUser();
      removeAccessToken();
    }

    return null;
  };
}
