import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const Address: React.FC<IProps> = ({
  firstName,
  lastName,
  companyName,
  streetAddress1,
  streetAddress2,
  city,
  postalCode,
  countryArea,
  country,
  phone,
}: // destructure props here if needed
IProps) => {
  return (
    <S.Wrapper>
      <strong>{`${firstName} ${lastName}`}</strong>
      <br />
      {companyName && (
        <>
          {companyName} <br />
        </>
      )}
      {streetAddress1}
      <br />
      {streetAddress2 && (
        <>
          {streetAddress2} <br />
        </>
      )}
      {city}, {postalCode}
      <br />
      {countryArea && (
        <>
          {countryArea} <br />
        </>
      )}
      {country}
      <br />
      {phone && (
        <>
          Phone number: {phone} <br />
        </>
      )}
    </S.Wrapper>
  );
};
