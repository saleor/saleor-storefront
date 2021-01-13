import * as React from "react";

import { Overlay, OverlayContextInterface } from "../..";

import "./scss/index.scss";

export interface IModal {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const Modal: React.FC<IModal> = ({ overlay, testingContext }) => (
  <Overlay testingContext={testingContext} context={overlay}>
    {overlay.context.content}
  </Overlay>
);

export default Modal;
