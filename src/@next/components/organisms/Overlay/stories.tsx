import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Overlay } from ".";
import { Position } from "./types";

const style = {
  padding: "5rem 4rem",
  "text-align": "center",
};
const Children = () => <div style={style}>Some content</div>;

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

const position: Position = "center";

const DEFAULT_PROPS = {
  children: Children,
  hide: action("hide"),
  position,
  show: true,
  target: portalRoot,
};

storiesOf("@components/organisms/Overlay", module)
  .addParameters({ component: Overlay })
  .add("Position center", () => (
    <Overlay {...DEFAULT_PROPS}>
      <Children />
    </Overlay>
  ))
  .add("Position left", () => {
    const position: Position = "left";
    const PROPS = { ...DEFAULT_PROPS, position };
    return (
      <Overlay {...PROPS}>
        <Children />
      </Overlay>
    );
  })
  .add("Position right", () => {
    const position: Position = "right";
    const PROPS = { ...DEFAULT_PROPS, position };
    return (
      <Overlay {...PROPS}>
        <Children />
      </Overlay>
    );
  });
