import React from "react";
import { FormattedMessage } from "react-intl";
import { LoginForm } from "..";
import ForgottenPassword from "../OverlayManager/Login/ForgottenPassword";

const SignInForm: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <>
    <h3 className="checkout__header">
      <FormattedMessage defaultMessage="Registered user" />
    </h3>
    <LoginForm />
    <ForgottenPassword onClick={onClick} />
  </>
);

export default SignInForm;
