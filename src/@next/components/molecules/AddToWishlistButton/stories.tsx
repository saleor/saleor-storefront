import { storiesOf } from "@storybook/react";
import React from "react";

import { AddToWishlistButton } from ".";
storiesOf("@components/molecules/AddToWishlistButton", module).add(
  "default",
  () => <AddToWishlistButton />
);
