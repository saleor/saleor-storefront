import React from "react";
import { PasswordResetForm } from "..";

import { FormattedMessage } from "react-intl";

const ResetPasswordForm: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <>
    <h3 className="checkout__header">
      <FormattedMessage 
          defaultMessage={"Registered user"}
          description={"registered user title"}/>
    </h3>
    <PasswordResetForm />
    <p>
      <span className="u-link" onClick={onClick}>
        <FormattedMessage 
          defaultMessage={"Back to login"}
          description={"back to login button"}/>
      </span>
    </p>
  </>
);

export default ResetPasswordForm;
