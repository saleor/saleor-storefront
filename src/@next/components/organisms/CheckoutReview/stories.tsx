import { storiesOf } from "@storybook/react";
import React from "react";

import { CheckoutReview } from ".";

storiesOf("@components/organisms/CheckoutReview", module)
.addParameters({ component: CheckoutReview })
.add("default", () =>
<CheckoutReview />);