import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Wishlist } from ".";
import { WISHLIST } from "./fixtures";

storiesOf("@components/templates/Wishlist", module).add("default", () => (
  <BrowserRouter>
    <Wishlist wishlist={WISHLIST} />
  </BrowserRouter>
));
