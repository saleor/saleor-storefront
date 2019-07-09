import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { SidebarModal } from ".";
import { IProps, Position } from "./types";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

const Children = () => <div>Content</div>;
const position: Position = "right";

const DEFAULT_PROPS = {
  children: Children,
  hide: action("hide"),
  position,
  show: true,
  target: portalRoot,
  title: "Sidebar title",
};

const renderSidebarModal = (props: IProps) => (
  <SidebarModal {...props}>
    <Children />
  </SidebarModal>
);

storiesOf("@components/organisms/SidebarModal", module)
  .add("default", () => renderSidebarModal(DEFAULT_PROPS))
  .add("Left side position", () => {
    const position: Position = "left";
    return renderSidebarModal({ ...DEFAULT_PROPS, position });
  });
