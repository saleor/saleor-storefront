import { storiesOf } from "@storybook/react";
import React from "react";

import { NavLink } from ".";
import { mockItemRoute } from "./fixtures";

storiesOf("@components/atoms/NavLink", module)
  .addParameters({ component: NavLink })
  .add("default", () => <NavLink item={mockItemRoute}>ELEMENT I</NavLink>);
