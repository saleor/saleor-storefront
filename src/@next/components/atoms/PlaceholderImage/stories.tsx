import { storiesOf } from "@storybook/react";
import React from "react";

import { PlaceholderImage } from ".";

storiesOf("@components/atoms/PlaceholderImage", module)
  .addParameters({ component: PlaceholderImage })
  .add("default", () => <PlaceholderImage />);
