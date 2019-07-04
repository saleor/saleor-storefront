import { storiesOf } from "@storybook/react";
import React from "react";

import { CachedImage } from ".";

storiesOf("@components/molecules/CachedImage", module).add("default", () => (
  <CachedImage url="https://dummyimage.com/600x400/000/fff" />
));
