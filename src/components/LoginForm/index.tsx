import "./scss/index.scss";

import * as React from "react";

import { useAuth, useSignIn } from "../../@sdk/react";

import { Button, Form, TextField } from "..";

interface ILoginForm {
  hide?: () => void;
}

const LoginForm: React.FC<ILoginForm> = ({ hide }) => {
  const { authenticated } = useAuth();
  const [signIn, { loading, error }] = useSignIn();

  const handleOnSubmit = async (evt, { email, password }) => {
    evt.preventDefault();
    signIn({ email, password });
  };

  React.useEffect(() => {
    if (authenticated) {
      hide();
    }
  }, [authenticated]);

  return (
    <div className="login-form">
      <Form
        errors={error ? error.extraInfo.userInputErrors : []}
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
          <Button type="submit" {...(loading && { disabled: true })}>
            {loading ? "Loading" : "Sign in"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
