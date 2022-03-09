import React from "react";
import withAuth from "../src/components/withAuth";

const Profile = (props) => {
  return <pre>{props.user.email}</pre>;
};

export default withAuth(Profile);
