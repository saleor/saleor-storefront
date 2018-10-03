import * as React from "react";
import { RouteComponentProps } from "react-router";

import { default as Routes } from "./routes";

import "./scss/index.scss";

const CheckoutApp: React.SFC<RouteComponentProps<{ match }>> = ({ match }) => (
  <Routes matchUrl={match.url} />
);

export default CheckoutApp;
