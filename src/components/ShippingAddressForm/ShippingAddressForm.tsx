import "./scss/index.scss";

// import classNames from "classnames";
import * as React from "react";

import { Form, Select, TextField } from "..";
import { ShopContext } from "../ShopProvider/context";
import { FormAddressType, IShippingAddressFormProps } from "./types";
import { getFormData } from "./utils";

import { CheckoutNextButton } from "../Button";

const ShippingAddressForm: React.FC<IShippingAddressFormProps> = ({
  data,
  buttonText,
  errors,
  loading,
  onSubmit,
  children,
  shippingAsBilling = false,
  noShipping = false,
  type = "shipping",
}) => (
  <div className="address-form">
    <ShopContext.Consumer>
      {({ countries, geolocalization, defaultCountry }) => (
        <Form<FormAddressType>
          errors={errors}
          onSubmit={(evt, data) => {
            evt.preventDefault();
            onSubmit(data);
          }}
          data={getFormData(geolocalization, defaultCountry, data)}
        >
          {children}
          <fieldset className="form-fieldset" disabled={shippingAsBilling}>
              <TextField
                label="Street Name"
                type="address-line1"
                name="streetAddress1"
                autoComplete="address-line1"
                required
              />
              <TextField
                label="City"
                type="city"
                name="city"
                autoComplete="address-level2"
                required
              />
              <div className="field-row">
                <TextField half
                  label="State/Province"
                  type="state"
                  name="countryArea"
                  autoComplete="address-level1"
                />
                <TextField half
                  label="ZIP Code"
                  type="postal-code"
                  name="postalCode"
                  autoComplete="postal-code"
                  required
                />
              </div>
              <Select
                label="Country"
                name="country"
                options={countries.map(country => ({
                  label: country.country,
                  value: country.code,
                }))}
                autoComplete="country"
              />
          </fieldset>
          <CheckoutNextButton className="btn-checkout-continue" type="submit" disabled={loading}>
            {loading ? "Loading" : buttonText}
          </CheckoutNextButton>
        </Form>
      )}
    </ShopContext.Consumer>
  </div>
);

export default ShippingAddressForm;
