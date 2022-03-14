import React from "react";
import withAuth from "../src/components/withAuth";
import { fetcher } from "../src/utils/fetcher";

const Profile = ({ user }) => {
  return (
    <>
      <pre>{user.email}</pre>
      <pre>{user.metamask_id}</pre>
    </>
  );
};

export default Profile;

export const getServerSideProps = withAuth(async (ctx) => {
  console.log(ctx.accessToken);
  const user = await fetcher({
    url: "user",
    method: "GET",
    token: ctx.accessToken,
  });

  console.table(user);
  if (!user) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: { user },
  };
});
