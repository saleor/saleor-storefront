import React from "react";

import { FormattedMessage } from "react-intl";

const ForgottenPassword: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <>
    <div className="login__content__password-reminder">
      <p>
        <FormattedMessage
          defaultMessage={"Have you forgotten your password?"}
          description={"sforgotten password message"}/>&nbsp;
        <span className="u-link" onClick={onClick}>
          <FormattedMessage
            defaultMessage={"Click Here"}
            description={"forgotten password button"}/>
        </span>
      </p>
    </div>
  </>
);

export default ForgottenPassword;
