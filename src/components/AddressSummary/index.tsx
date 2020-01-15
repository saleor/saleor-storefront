import "./scss/index.scss";

import * as React from "react";

import { FormAddressType } from "../ShippingAddressForm/types";

const AddressSummary: React.FC<{
  address?: FormAddressType;
  email?: string;
  paragraphRef?: React.RefObject<HTMLParagraphElement>;
}> = ({ address, email, paragraphRef }) => {
  if (address) {
    return (
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
  } else if (email) {
    return (
      <p className="address-summary" ref={paragraphRef}>
        {email}
      </p>
    );
  }
  return null;
};

export default AddressSummary;
