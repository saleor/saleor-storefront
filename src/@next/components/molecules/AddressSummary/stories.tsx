import { storiesOf } from "@storybook/react";
import React from "react";

import { AddressSummary } from ".";

storiesOf("@components/molecules/AddressSummary", module)
  .addParameters({ component: AddressSummary })
  .add("default", () => <AddressSummary />);
