import "./scss/index.scss";

import * as React from "react";

import { Address } from "../../checkout/types/Address";

const AddressSummary: React.FC<{
  address: Address;
  email?: string;
  paragraphRef?: React.RefObject<HTMLParagraphElement>;
}> = ({ address, email, paragraphRef }) => (
  <p className="address-summary" ref={paragraphRef}>
    <strong>{`${address.firstName} ${address.lastName}`}</strong>
    <br />
    {address.companyName && (
      <>
        {address.companyName} <br />
      </>
    )}
    {address.streetAddress1}
    <br />
    {address.streetAddress2 && (
      <>
        {address.streetAddress2} <br />
      </>
    )}
    {address.city}, {address.postalCode}
    <br />
    {address.countryArea && (
      <>
        {address.countryArea} <br />
      </>
    )}
    {address.country.country}
    <br />
    {address.phone && (
      <>
        Phone number: {address.phone} <br />
      </>
    )}
    {email && (
      <>
        {email} <br />
      </>
    )}
  </p>
);

export default AddressSummary;
