import * as React from "react";

import { Button, Form, TextField } from "..";
import { useIntl } from "react-intl";
import { commonMessages } from "@temp/intl";

import "./scss/index.scss";

const Email: React.FC<any> = () => {
    const intl = useIntl();
    const formData = {};
    const handleOnSubmit =  (evt, email) => {
        evt.preventDefault();
      };
    return (
      <div className="footer-email">
        <Form data={formData} errors={[]} onSubmit={handleOnSubmit} className="formEmail">
          <TextField
            name="email"
            autoComplete="email"
            label={intl.formatMessage(commonMessages.eMail)}
            type="email"
            required
          />
          <div className="email-form__button">
            <Button
              testingContext="submit"
              type="submit"
            >
              {intl.formatMessage({ defaultMessage: "Subscribe" })}
            </Button>
          </div>
        </Form>
      </div>
    );
}

export default Email;
