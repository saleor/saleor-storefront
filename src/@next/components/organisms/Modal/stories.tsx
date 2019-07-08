import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Modal } from ".";

const PROPS = {
  cancelBtnText: "Cancel",
  formId: "form-id",
  hide: action("hide"),
  loading: false,
  show: true,
  submitBtnText: "Save",
  title: "Modal title",
};

const Children = () => <div>Content</div>;
storiesOf("@components/organisms/Modal", module).add("default", () => (
  <Modal {...PROPS}>
    <Children />
  </Modal>
));
