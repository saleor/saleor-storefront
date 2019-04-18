import * as React from "react";

import { SelectField, TextField } from "..";
import { getShop_shop_countries } from "../ShopProvider/types/getShop";

interface IShippingAddressFormContent {
  countries: getShop_shop_countries[] | null;
  billing?: boolean;
}

export const ShippingAddressFormContent = ({
  countries,
  billing
}: IShippingAddressFormContent) => (
  <>
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
      required
    />
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
      />
      <TextField
        label="State/Province"
        type="state"
        name="countryArea"
        autoComplete="address-level1"
        required
      />
    </div>
    <div className="address-form__grid">
      <TextField
        label="Zip-Code"
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
  </>
);
