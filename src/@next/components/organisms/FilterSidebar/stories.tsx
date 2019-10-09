import { storiesOf } from "@storybook/react";
import React from "react";

import { FilterSidebar } from ".";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

storiesOf("@components/organisms/FilterSidebar", module).add("default", () => (
  <FilterSidebar target={portalRoot} />
));
