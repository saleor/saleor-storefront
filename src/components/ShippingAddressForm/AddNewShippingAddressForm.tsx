import "./scss/index.scss";

import * as React from "react";

import { Form, SelectField, TextField } from "..";

import { ShopContext } from "../ShopProvider/context";
import { FormAddressType, IShippingNewAddressFormProps } from "./types";
import { getFormData } from "./utils";

export const AddNewShippingAddressForm: React.SFC<
  IShippingNewAddressFormProps
> = ({ data, billing, errors, onSubmit, children }) => (
  <div className="address-form">
    <ShopContext.Consumer>
      {({ countries, geolocalization, defaultCountry }) => {
        const checkboxText = billing
          ? "Use this address as new billing address"
          : "Use this address as new shipping address";
        return (
          <Form<FormAddressType>
            id="new-address-form"
            errors={errors}
            onSubmit={(evt, data) => {
              evt.preventDefault();
              onSubmit(data);
            }}
            data={getFormData(geolocalization, defaultCountry, data)}
          >
            {children}

            <div className="address-form__grid">
              <TextField
                label="First Name"
                type="given-name"
                name="firstName"
                autoComplete="given-name"
                required
              />
              <TextField
                label="Last Name"
                type="family-name"
                name="lastName"
                autoComplete="family-name"
                required
              />
            </div>
            <TextField
              label="Street Line 1"
              type="address-line1"
              name="streetAddress1"
              autoComplete="address-line1"
              required
            />
            <TextField
              label="Street Line 2"
              type="address-line2"
              name="streetAddress2"
              autoComplete="address-line2"
            />
            <TextField
              label="Company"
              type="organization"
              name="companyName"
              autoComplete="organization"
            />
            <div className="address-form__grid">
              <TextField
                label="City"
                type="city"
                name="city"
                autoComplete="address-level2"
                required
              />
              <TextField
                label="State/Province"
                type="state"
                name="countryArea"
                autoComplete="address-level1"
              />
            </div>
            <div className="address-form__grid">
              <TextField
                label="ZIP Code"
                type="postal-code"
                name="postalCode"
                autoComplete="postal-code"
                required
              />
              <SelectField
                label="Country"
                name="country"
                options={countries.map(country => ({
                  label: country.country,
                  value: country.code
                }))}
              />
            </div>
            {!billing && (
              <TextField
                label="Email Address"
                type="email"
                autoComplete="email"
                name="email"
                required
              />
            )}
            <TextField
              label="Phone number"
              type="tel"
              name="phone"
              autoComplete="tel"
            />

            <label className="checkbox checkbox__bottom">
              <input name="asNew" type="checkbox" />
              <span>{checkboxText}</span>
            </label>
          </Form>
        );
      }}
    </ShopContext.Consumer>
  </div>
);

export default AddNewShippingAddressForm;
