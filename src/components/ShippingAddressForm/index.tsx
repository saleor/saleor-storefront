import * as React from "react";

import { Button, Form, SelectField, TextField } from "..";
import { AddressInterface } from "../../core/types";
import { FormError } from "../Form";
import { ShopContext } from "../ShopProvider/context";

import "./scss/index.scss";

interface AddressType extends AddressInterface {
  email?: string;
}

const ShippingAddressForm: React.SFC<{
  buttonText: string;
  billing?: boolean;
  data?: AddressType;
  errors: FormError[];
  loading: boolean;
  onSubmit(event: any, data: any): void;
}> = ({ data, billing, buttonText, errors, loading, onSubmit }) => (
  <div className="address-form">
    <ShopContext.Consumer>
      {({ countries }) => (
        <Form errors={errors} onSubmit={onSubmit} data={data}>
          {!billing ? (
            <TextField
              label="Email Address"
              type="email"
              autoComplete="email"
              name="email"
            />
          ) : null}
          <div className="address-form__grid">
            <TextField
              label="First Name"
              type="given-name"
              name="firstName"
              autoComplete="given-name"
            />
            <TextField
              label="Last Name"
              type="family-name"
              name="lastName"
              autoComplete="family-name"
            />
          </div>
          <TextField
            label="Company"
            type="organization"
            name="companyName"
            autoComplete="organization"
          />
          <TextField
            label="Street Line 1"
            type="address-line1"
            name="streetAddress1"
            autoComplete="address-line1"
          />
          <TextField
            label="Street Line 2"
            type="address-line2"
            name="streetAddress2"
            autoComplete="address-line2"
          />
          <div className="address-form__grid">
            <TextField
              label="City"
              type="city"
              name="city"
              autoComplete="city"
            />
            <TextField
              label="State/Province"
              type="state"
              name="countryArea"
              autoComplete="state"
            />
          </div>
          <div className="address-form__grid">
            <TextField
              label="Zip-Code"
              type="postal-code"
              name="postalCode"
              autoComplete="postal-code"
            />
            <SelectField
              label="Country"
              name="country"
              autoComplete="country-name"
              options={countries.map(country => ({
                label: country.country,
                value: country.code
              }))}
            />
          </div>
          {!billing ? (
            <>
              <TextField
                label="Phone number"
                type="tel"
                name="phone"
                autoComplete="phone-number"
              />
              <label className="checkbox">
                <input name="asBilling" type="checkbox" />
                <span>Use as Billing Address</span>
              </label>
            </>
          ) : null}
          <Button disabled={loading}>{loading ? "Loading" : buttonText}</Button>
        </Form>
      )}
    </ShopContext.Consumer>
  </div>
);

export default ShippingAddressForm;
