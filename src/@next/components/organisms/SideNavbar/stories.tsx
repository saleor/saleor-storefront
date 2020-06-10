import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { items } from "./fixtures";

import { SideNavbar } from ".";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}
storiesOf("@components/organisms/SideNavbar", module)
  .addParameters({ component: SideNavbar })
  .add("default", () => (
    <BrowserRouter>
      <SideNavbar
        show
        onHide={action("hide")}
        target={portalRoot}
        items={items}
      />
    </BrowserRouter>
  ));
