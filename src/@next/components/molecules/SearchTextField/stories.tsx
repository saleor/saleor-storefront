import { storiesOf } from "@storybook/react";
import React from "react";

import { SearchTextField } from ".";
storiesOf("@components/molecules/SearchTextField", module)
.add("default", () =>
<SearchTextField />);