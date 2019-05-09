import React from "react";
import { LoginForm } from "../";

const SignInForm = ({ onClick }) => (
  <>
    <h3 className="checkout__header">Registered user</h3>
    <LoginForm />
    <div className="login__content__password-reminder">
      <p>
        Have you forgotten your password?&nbsp;
        <span onClick={onClick}>Click Here</span>
      </p>
    </div>
  </>
);

export default SignInForm;
