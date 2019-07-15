import "./scss/index.scss";

import * as React from "react";

import { useSignIn } from "../../@sdk/react";

import { Button, Form, TextField } from "..";
import { UserContext } from "../User/context";
import { TokenAuth, TokenAuth_tokenCreate_user } from "../User/types/TokenAuth";

interface ILoginForm {
  hide?: () => void;
}

const LoginForm: React.FC<ILoginForm> = ({ hide }) => { 
  const [ signIn, { loading, error } ] = useSignIn();

  const handleOnSubmit = async (evt, { email, password }) => {
    evt.preventDefault();
    await signIn({ email, password });
    if (window.PasswordCredential) {
      const cred = new window.PasswordCredential({
        id: email,
        password,
      });
      navigator.credentials.store(cred);
    }
    hide();
  };
  
  return (
    <div className="login-form">
      <Form
        errors={[]}
        onSubmit={handleOnSubmit}
      >
        <TextField
          name="email"
          autoComplete="email"
          label="Email Address"
          type="email"
          required
        />
        <TextField
          name="password"
          autoComplete="password"
          label="Password"
          type="password"
          required
        />
        <div className="login-form__button">
          <Button type="submit" {...loading && { disabled: true }}>
            {loading ? "Loading" : "Sign in"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
