import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { default as Routes } from "./routes";

import "./scss/index.scss";

const Checkout: React.SFC<{}> = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default Checkout;
