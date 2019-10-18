import { storiesOf } from "@storybook/react";
import React from "react";

import { GqlSummitBanner } from ".";
storiesOf("@components/organisms/GqlSummitBanner", module)
.add("default", () =>
<GqlSummitBanner />);