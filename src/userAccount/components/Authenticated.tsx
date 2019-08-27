import React from "react";

import { useUserDetails } from "@sdk/react";

import { NotFound } from "../../components";

const Authenticated: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { data: user } = useUserDetails();

  return user ? children : <NotFound />;
};

export default Authenticated;
