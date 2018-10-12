import * as React from "react";

import { AddressInterface } from "../../core/types";

import "./scss/index.scss";

const AddressSummary: React.SFC<{ address: AddressInterface }> = ({
  address
}) => (
  <p className="address-summary">
    <strong>{`${address.firstName} ${address.lastName}`}</strong>
    <br />
    {address.companyName ? (
      <>
        {address.companyName} <br />
      </>
    ) : null}
    {address.streetAddress1}
    <br />
    {address.streetAddress2 ? (
      <>
        {address.streetAddress2} <br />
      </>
    ) : null}
    {address.city}, {address.postalCode}
    <br />
    {address.countryArea ? (
      <>
        {address.countryArea} <br />
      </>
    ) : null}
    {address.country.code}
    <br />
    Phone Number: {address.phone}
  </p>
);

export default AddressSummary;
