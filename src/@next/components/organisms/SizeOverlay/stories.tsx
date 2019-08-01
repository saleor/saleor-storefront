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
  onClick: action("onClick"),
  selected: "7 3/8",
  show: true,
  target: portalRoot,
  values: [
    "7",
    "7 1/8",
    "7 1/4",
    "7 3/8",
    "7 1/2",
    "7 5/8",
    "7 3/4",
    "7 7/8",
    "8",
  ],
};

import { SizeOverlay } from ".";
storiesOf("@components/organisms/SizeOverlay", module).add("default", () => (
  <SizeOverlay {...DEFAULT_PROPS} />
));
