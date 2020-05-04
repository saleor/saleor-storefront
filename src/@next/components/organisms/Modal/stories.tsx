import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Modal } from ".";
import { IProps } from "./types";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

const Children = () => <div>Content</div>;

const DEFAULT_PROPS = {
  children: Children,
  disabled: false,
  hide: action("hide"),
  show: true,
  submitBtnText: "Save",
  target: portalRoot,
  title: "Modal title",
};

const renderModal = (props: IProps) => (
  <Modal {...props}>
    <Children />
  </Modal>
);
storiesOf("@components/organisms/Modal", module)
  .addParameters({ component: Modal })
  .add("Modal Form", () =>
    renderModal({
      ...DEFAULT_PROPS,
      cancelBtnText: "Cancel",
      formId: "form-id",
    })
  )
  .add("Modal Form disabled", () =>
    renderModal({ ...DEFAULT_PROPS, disabled: true })
  )
  .add("Modal Info", () =>
    renderModal({
      ...DEFAULT_PROPS,
      onSubmit: action("submit and hide"),
      submitBtnText: "OK",
    })
  );
