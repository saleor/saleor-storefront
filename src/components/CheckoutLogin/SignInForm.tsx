import React from "react";
import { FormattedMessage } from "react-intl";

import { LoginForm } from "..";

const SignInForm: React.FC = () => (
  <>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h3 className="checkout__header">
        <FormattedMessage defaultMessage="Login" />
      </h3>
    </div>
    <LoginForm />
  </>
);

export default SignInForm;
