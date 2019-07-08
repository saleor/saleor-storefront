import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Modal } from ".";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

const PROPS = {
  cancelBtnText: "Cancel",
  formId: "form-id",
  hide: action("hide"),
  loading: false,
  show: true,
  submitBtnText: "Save",
  target: portalRoot,
  title: "Modal title",
};

const Children = () => <div>Content</div>;
storiesOf("@components/organisms/Modal", module).add("default", () => (
  <Modal {...PROPS}>
    <Children />
  </Modal>
));
