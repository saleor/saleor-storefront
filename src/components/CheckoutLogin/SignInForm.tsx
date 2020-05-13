import React from "react";
import { LoginForm } from "../";
import ForgottenPassword from "../OverlayManager/Login/ForgottenPassword";

import { FormattedMessage } from "react-intl";

const SignInForm: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <>
    <h3 className="checkout__header">
      <FormattedMessage
        defaultMessage={"Registered user"}
        description={"sign in form title"}/>
      </h3>
    <LoginForm />
    <ForgottenPassword onClick={onClick} />
  </>
);

export default SignInForm;
