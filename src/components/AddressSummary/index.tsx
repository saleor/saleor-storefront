import "./scss/index.scss";

import * as React from "react";

import { FormAddressType } from "./types";

import { useIntl } from "react-intl";

const AddressSummary: React.FC<{
  address?: FormAddressType;
  email?: string;
  paragraphRef?: React.RefObject<HTMLParagraphElement>;
}> = ({ address, email, paragraphRef }) => {
  const intl = useIntl();

  if (address) {
    return (
      <p className="address-summary" ref={paragraphRef}>
        <strong> 
          {intl.formatMessage({
            defaultMessage: "{firstName} {lastName}",
            description: "full name address summary title",
          },
          {
            firstName: address.firstName,
            lastName: address.lastName,
          })}
          </strong>
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
          {
            intl.formatMessage({
            defaultMessage: "Phone number: ",
            description: "phone number AddressSummary title",
          })}
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
