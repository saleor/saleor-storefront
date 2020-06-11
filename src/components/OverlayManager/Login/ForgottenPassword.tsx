import React from "react";

const ForgottenPassword: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <>
    <div className="login__content__password-reminder">
      <p>
        Zapomniałeś swoje hasło?&nbsp;
        <span className="u-link" onClick={onClick} data-cy="accountOverlayForgottenPasswordLink">
          Kliknij tutaj
        </span>
      </p>
    </div>
  </>
);

export default ForgottenPassword;
