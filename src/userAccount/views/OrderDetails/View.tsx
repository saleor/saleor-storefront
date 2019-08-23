import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import { useOrderDetails, useUserDetails } from "@sdk/react";

import Page from "./Page";

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  match: {
    params: { token },
  },
}) => {
  const { data: order } = useOrderDetails({ token });
  const { data: user } = useUserDetails();
  const guest = !user;

  return (
    <div className="order-details container">
      <Page guest={guest} order={order} />
    </div>
  );
};

export default View;
