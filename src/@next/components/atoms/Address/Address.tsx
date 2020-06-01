import React from "react";

import { IAddress } from "@types";

import * as S from "./styles";

export const Address: React.FC<IAddress> = ({
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
}: IAddress) => (
  <div>
    <S.Name>{`${firstName} ${lastName}`}</S.Name>
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
    {postalCode && `${postalCode},`} {city}
    <br />
    {countryArea && <>{countryArea}, </>}
    {country!.country}
    <br />
    {phone && (
      <>
        Phone number: {phone} <br />
      </>
    )}
  </div>
);
