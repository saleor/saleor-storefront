import React from "react";
import { FormattedMessage } from "react-intl";

const ForgottenPassword: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <>
    <div className="login__content__password-reminder">
      <p>
        <FormattedMessage defaultMessage="Have you forgotten your password?" />{" "}
        <span
          className="u-link"
          onClick={onClick}
          data-test="accountOverlayForgottenPasswordLink"
        >
          <FormattedMessage defaultMessage="Click Here" />
        </span>
      </p>
    </div>
  </>
);

export default ForgottenPassword;
