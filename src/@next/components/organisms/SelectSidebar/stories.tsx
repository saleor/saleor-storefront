import { storiesOf } from "@storybook/react";
import React from "react";

import { action } from "@storybook/addon-actions";

import { SelectSidebar } from ".";
import { DEFAULT_PROPS } from "./testData";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

storiesOf("@components/organisms/SelectSidebar", module)
  .addParameters({ component: SelectSidebar })
  .add("default", () => (
    <SelectSidebar
      title="PLEASE SELECT SIZE"
      target={portalRoot}
      {...DEFAULT_PROPS}
      show={true}
      hide={action("hide")}
      onSelect={action("onSelect")}
    />
  ))
  .add("with footer", () => (
    <SelectSidebar
      title="PLEASE SELECT SIZE"
      footerTitle="SHOW SIZE TABLE"
      onClickFooter={action("onClickFooter")}
      target={portalRoot}
      {...DEFAULT_PROPS}
      show={true}
      hide={action("hide")}
      onSelect={action("onSelect")}
    />
  ));
