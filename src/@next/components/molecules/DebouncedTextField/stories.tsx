import { storiesOf } from "@storybook/react";
import React from "react";

import { DebouncedTextField } from ".";
storiesOf("@components/molecules/DebouncedTextField", module)
.add("default", () =>
<DebouncedTextField />);