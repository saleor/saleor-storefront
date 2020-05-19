import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

import { FormattedMessage } from "react-intl";

/**
 * Address summary
 */
const AddressSummary: React.FC<IProps> = ({ address, email }: IProps) => {
  if (address) {
    return (
      <S.Wrapper>
        <strong>{`${address.firstName} ${address.lastName}`}</strong>
        <br />
        {address.companyName && (
          <>
            {address.companyName} <br />
          </>
        )}
        {address.streetAddress1}
        {address.streetAddress2 && <>, {address.streetAddress2}</>},{" "}
        {address.city}, {address.postalCode}
        {address.countryArea && <>, {address.countryArea}</>},{" "}
        {address.country?.country}
        <br />
        {address.phone && (
          <>
            
            <FormattedMessage
              defaultMessage="Phone number: "
            />{address.phone} <br />
          </>
        )}
        {email && (
          <>
            <FormattedMessage
              defaultMessage="Email: "
            />
            {email} <br />
          </>
        )}
      </S.Wrapper>
    );
  } else if (email) {
    return <S.Wrapper>{email}</S.Wrapper>;
  }
  return null;
};

export { AddressSummary };
