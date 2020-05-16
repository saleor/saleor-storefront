import "./scss/index.scss";

import * as React from "react";

import { Form, TextField } from "..";
import { CheckoutNextButton } from "../Button";
import { useLocalStorage } from "@hooks";
import { withRouter, generatePath } from "react-router";
import { shippingAddressUrl } from "@temp/checkout/routes";

const ContactForm: React.FC<any> = ({
  buttonText,
  errors,
  loading,
  children,
  history,
}) => {
  const {
    storedValue: contactFields,
    setValue: setContactFields,
  } = useLocalStorage("contactFields");

  return (
    <div className="address-form">
      <Form<any>
        errors={errors}
        onSubmit={(evt, data) => {
          evt.preventDefault();
          setContactFields(data);
          location.href = generatePath(shippingAddressUrl);
        }}
        data={contactFields || null}
      >
        {children}
        <fieldset className="form-fieldset">
          <TextField
            label="Full Name"
            type="given-name"
            name="firstName"
            autoComplete="given-name"
            required
          />
          <TextField
            label="Phone"
            type="phone"
            name="phone"
            autoComplete="phone"
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </fieldset>
        <CheckoutNextButton
          className="btn-checkout-continue"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading" : "Next"}
        </CheckoutNextButton>
      </Form>
    </div>
  );
};

export default withRouter(ContactForm);
