import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { TopNavbar } from ".";

storiesOf("@components/organisms/TopNavbar", module).add("default", () => (
  <BrowserRouter>
    <TopNavbar />
  </BrowserRouter>
));
