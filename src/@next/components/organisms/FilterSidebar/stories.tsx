import { storiesOf } from "@storybook/react";
import React from "react";

import { action } from "@storybook/addon-actions";
import { FilterSidebar } from ".";
import { DEFAULT_PROPS } from "./testData";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

storiesOf("@components/organisms/FilterSidebar", module)
  .addParameters({ component: FilterSidebar })
  .add("default", () => (
    <FilterSidebar
      target={portalRoot}
      {...DEFAULT_PROPS}
      hide={action("hide")}
      onAttributeFiltersChange={action("onAttributesFiltersChange")}
    />
  ));
