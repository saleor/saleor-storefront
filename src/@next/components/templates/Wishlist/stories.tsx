import { storiesOf } from "@storybook/react";
import React from "react";

import { Wishlist } from ".";
import { WISHLIST } from "./fixtures";

storiesOf("@components/templates/Wishlist", module).add("default", () => (
  <Wishlist wishlist={WISHLIST} />
));
