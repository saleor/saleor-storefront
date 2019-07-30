import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

const DEFAULT_PROPS = {
  hide: action("hide"),
  show: true,
  target: portalRoot,
};

import { SizeOverlay } from ".";
storiesOf("@components/organisms/SizeOverlay", module).add("default", () => (
  <SizeOverlay {...DEFAULT_PROPS} />
));
