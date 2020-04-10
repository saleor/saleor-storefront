import { storiesOf } from "@storybook/react";
import React from "react";

import { StripeCreditCardForm } from ".";

storiesOf("@components/organisms/StripeCreditCardForm", module)
.addParameters({ component: StripeCreditCardForm })
.add("default", () =>
<StripeCreditCardForm />);