import { storiesOf } from "@storybook/react";
import React from "react";

import { OrdersHistory } from ".";
storiesOf("@components/views/OrdersHistory", module)
.add("default", () =>
<OrdersHistory />);