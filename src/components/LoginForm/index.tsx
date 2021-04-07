import { useAuth } from "@saleor/sdk";
import * as React from "react";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import { demoMode } from "@temp/constants";
import { commonMessages } from "@temp/intl";

import { Form, TextField } from "..";

import "./scss/index.scss";

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
        <p className="account">
          Account:
        </p>
        <TextField
          name="email"
          autoComplete="email"
          label={intl.formatMessage(commonMessages.eMail)}
          type="email"
          required
        />

        <div className="passWord">
          <span>
            Password:
          </span>
          <span className="u-link" style={{ float: "right" }}>
            <FormattedMessage defaultMessage="Forgot Password"></FormattedMessage>
          </span>
        </div>

        <TextField
          name="password"
          autoComplete="password"
          label={intl.formatMessage(commonMessages.password)}
          type="password"
          required
        />
        <div>
          <input type="checkbox" />
          <label>
            <span> Stay signed in. </span>
            <span className="u-link">
              <FormattedMessage defaultMessage=" Details"></FormattedMessage>
            </span>
          </label>
        </div>
        <div className="login-form__button">
          <button className="login"
            // testingContext="submit"
            type="submit"
            {...(loading && { disabled: true })}
          >
            {loading
              ? intl.formatMessage(commonMessages.loading)
              : intl.formatMessage({ defaultMessage: "Sign in" })}
          </button>
        </div>
        <div className="mobileNumber">
          <span className="u-link">
            <FormattedMessage defaultMessage="Mobile number sign in"></FormattedMessage>
          </span>
        </div>
        <hr />
        <div className="signInWithZalo">
          <p className="signInWith">
            Sign in with:
          </p>
          <div>
            <a href="https://id.zalo.me/account?continue=https%3A%2F%2Fchat.zalo.me%2F">
              <img src="https://seeklogo.com/images/Z/zalo-logo-B0A0B2B326-seeklogo.com.png"
                alt="zalo" width="45px" />
            </a>
          </div>
        </div>
        <div>
          <input type="checkbox" />
          <label>
            I agree to Free Membership Agreement
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label>
            I agree to Receive marketing materials
          </label>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
