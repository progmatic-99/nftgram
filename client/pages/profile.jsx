import React from "react";
// import withAuth from "../src/components/withAuth";
import { useStore } from "../src/store/user";

const Profile = () => {
  const user = useStore((state) => state.user);
  return (
    <>
      <pre>{user.email}</pre>
    </>
  );
};

export default Profile;
