import { storiesOf } from "@storybook/react";
import React from "react";

import { AddressGridSelector } from ".";

storiesOf("@components/organisms/AddressGridSelector", module)
.addParameters({ component: AddressGridSelector })
.add("default", () =>
<AddressGridSelector />);