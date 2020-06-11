import React from "react";
import { PasswordResetForm } from "..";

const ResetPasswordForm: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <>
    <h3 className="checkout__header">Zarejestrowany użytkownik</h3>
    <PasswordResetForm />
    <p>
      <span className="u-link" onClick={onClick}>
        Powrót do logowania
      </span>
    </p>
  </>
);

export default ResetPasswordForm;
