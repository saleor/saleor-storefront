import { storiesOf } from "@storybook/react";
import React from "react";

import { StripeInputElement } from ".";

storiesOf("@components/atoms/StripeInputElement", module)
.addParameters({ component: StripeInputElement })
.add("default", () =>
<StripeInputElement />);