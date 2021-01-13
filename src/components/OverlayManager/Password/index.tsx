import * as React from "react";
import { FormattedMessage } from "react-intl";
import ReactSVG from "react-svg";

import { OfflinePlaceholder } from "@components/atoms";

import closeImg from "../../../images/x.svg";
import {
  Offline,
  Online,
  Overlay,
  OverlayContextInterface,
  PasswordResetRequestForm,
} from "../..";

import "./scss/index.scss";

const Password: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => (
  <Overlay testingContext="passwordOverlay" context={overlay}>
    <div className="password-reset">
      <Online>
        <div className="overlay__header">
          <p className="overlay__header-text">
            <FormattedMessage defaultMessage="Reset your password" />
          </p>
          <ReactSVG
            path={closeImg}
            onClick={overlay.hide}
            className="overlay__header__close-icon"
          />
        </div>
        <div className="password-reset__content">
          <PasswordResetRequestForm />
        </div>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </div>
  </Overlay>
);

export default Password;
