import * as React from "react";

import { AddressInterface } from "../../core/types";

import "./scss/index.scss";

const AddressSummary: React.SFC<{
  address: AddressInterface;
  email?: string;
}> = ({ address, email }) => (
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
    {address.country.country}
    <br />
    {address.phone ? (
      <>
        {address.phone} <br />
      </>
    ) : null}
    {email ? (
      <>
        {email} <br />
      </>
    ) : null}
  </p>
);

export default AddressSummary;
