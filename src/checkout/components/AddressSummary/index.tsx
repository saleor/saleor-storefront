import "./scss/index.scss";

import * as React from "react";
import { getCheckout_checkout_shippingAddress } from "../../types/getCheckout";

const AddressSummary: React.FC<{
  address: getCheckout_checkout_shippingAddress;
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
        {address.phone} <br />
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
