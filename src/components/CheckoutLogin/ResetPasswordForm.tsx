import React from "react";
import { PasswordResetForm } from "..";

const ResetPasswordForm = ({ onClick }) => (
  <>
    <h3 className="checkout__header">Registered user</h3>
    <PasswordResetForm />
    <div className="login__content__password-reminder">
      <p>
        <span onClick={onClick}>Back to login</span>
      </p>
    </div>
  </>
);

export default ResetPasswordForm;
