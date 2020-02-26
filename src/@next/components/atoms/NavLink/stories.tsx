import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { NavLink } from ".";
import { mockItemRoute } from "./fixtures";

storiesOf("@components/atoms/NavLink", module)
  .addParameters({ component: NavLink })
  .add("default", () => (
    <BrowserRouter>
      <NavLink item={mockItemRoute}>ELEMENT I</NavLink>
    </BrowserRouter>
  ));
