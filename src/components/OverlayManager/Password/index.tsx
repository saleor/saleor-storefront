import "./scss/index.scss";

import * as React from "react";
import { mdiClose } from "@mdi/js";

import {
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
  PasswordResetForm,
  Icon
} from "../..";

const Password: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay
}) => (
  <Overlay context={overlay}>
    <div className="password-reset">
      <Online>
        <div className="overlay__header">
          <p>Reset your password</p>
          <Icon
            path={mdiClose}
            onClick={overlay.hide}
            className="overlay__header__close-icon"
          />
        </div>
        <div className="password-reset__content">
          <PasswordResetForm />
        </div>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </div>
  </Overlay>
);

export default Password;
