import { storiesOf } from "@storybook/react";
import React from "react";

import { OfflinePlaceholder } from ".";

storiesOf("@components/atoms/OfflinePlaceholder", module)
  .addParameters({ component: OfflinePlaceholder })
  .add("default", () => <OfflinePlaceholder />);
