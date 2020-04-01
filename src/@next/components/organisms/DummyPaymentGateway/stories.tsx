import { storiesOf } from "@storybook/react";
import React from "react";

import { DummyPaymentGateway } from ".";

storiesOf("@components/organisms/DummyPaymentGateway", module)
.addParameters({ component: DummyPaymentGateway })
.add("default", () =>
<DummyPaymentGateway />);