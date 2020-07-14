import "./scss/index.scss";

import * as React from "react";
import { useIntl } from "react-intl";

import { useAuth } from "@saleor/sdk";
import { demoMode } from "@temp/constants";
import { commonMessages } from "@temp/intl";

import { Button, Form, TextField } from "..";

interface ILoginForm {
  hide?: () => void;
}

const LoginForm: React.FC<ILoginForm> = ({ hide }) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);

  const handleOnSubmit = async (evt, { email, password }) => {
    evt.preventDefault();
    setLoading(true);
    const { data, dataError } = await signIn(email, password);
    setLoading(false);
    if (dataError?.error) {
      setErrors(dataError.error);
    } else if (data && hide) {
      setErrors(null);
      hide();
    }
  };

  const formData = demoMode
    ? {
        email: "admin@example.com",
        password: "admin",
      }
    : {};

  const intl = useIntl();

  return (
    <div className="login-form">
      <Form data={formData} errors={errors || []} onSubmit={handleOnSubmit}>
        <TextField
          name="email"
          autoComplete="email"
          label={intl.formatMessage(commonMessages.eMail)}
          type="email"
          required
        />
        <TextField
          name="password"
          autoComplete="password"
          label={intl.formatMessage(commonMessages.password)}
          type="password"
          required
        />
        <div className="login-form__button">
          <Button
            testingContext="submit"
            type="submit"
            {...(loading && { disabled: true })}
          >
            {loading
              ? intl.formatMessage(commonMessages.loading)
              : intl.formatMessage({ defaultMessage: "Sign in" })}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
