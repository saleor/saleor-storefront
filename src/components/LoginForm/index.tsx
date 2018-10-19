import * as React from "react";

import { Button, Form, TextField } from "..";
import { UserContext } from "../User/context";

import "./scss/index.scss";

const LoginForm: React.SFC<{}> = () => (
  <div className="login-form">
    <UserContext.Consumer>
      {({ loading, login, errors }) => (
        <Form
          errors={errors}
          onSubmit={(event, data) => {
            login(data.email, data.password);
            event.preventDefault();
          }}
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
      )}
    </UserContext.Consumer>
  </div>
);

export default LoginForm;
