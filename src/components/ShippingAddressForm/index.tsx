import * as React from "react";
import { Query } from "react-apollo";

import { Button, Form, SelectField, TextField } from "..";
import { FormError } from "../Form";
import { GET_COUNTRIES_LIST } from "./queries";

import "./scss/index.scss";

const ShippingAddressForm: React.SFC<{
  errors: FormError[];
  loading: boolean;
  onSubmit(event: any, data: any): void;
}> = ({ errors, loading, onSubmit }) => (
  <Query query={GET_COUNTRIES_LIST}>
    {({ data: { shop } }) => {
      return (
        <div className="address-form">
          <Form errors={errors} onSubmit={onSubmit}>
            <TextField label="Email Address" type="email" name="email" />
            <div className="address-form__grid">
              <TextField
                label="First Name"
                type="given-name"
                name="givenName"
              />
              <TextField
                label="Last Name"
                type="family-name"
                name="familyName"
              />
            </div>
            <TextField
              label="Company"
              type="organization"
              name="organization"
            />
            <TextField
              label="Street Line 1"
              type="address-line1"
              name="addressLine1"
            />
            <TextField
              label="Street Line 2"
              type="address-line2"
              name="addressLine2"
            />
            <div className="address-form__grid">
              <TextField label="City" type="city" name="city" />
              <TextField label="State/Province" type="state" name="state" />
            </div>
            <div className="address-form__grid">
              <TextField
                label="Zip-Code"
                type="postal-code"
                name="postalCode"
              />
              <SelectField
                label="Country"
                name="countryName"
                options={shop.countries.map(country => ({
                  label: country.country,
                  value: country.code
                }))}
              />
            </div>
            <TextField label="Phone number" type="tel" name="phoneNumber" />
            <label className="checkbox">
              <input type="checkbox" />
              <span>Use as Billing Address</span>
            </label>
            <Button disabled={loading}>
              {loading ? "Loading" : "Continue to shipping"}
            </Button>
          </Form>
        </div>
      );
    }}
  </Query>
);

export default ShippingAddressForm;
