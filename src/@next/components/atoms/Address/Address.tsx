import { Trans } from "@lingui/react";
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
}: IProps) => (
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
    {postalCode}, {city}
    <br />
    {countryArea && <>{countryArea}, </>}
    {country}
    <br />
    {phone && (
      <>
        <Trans id="Phone number" />: {phone} <br />
      </>
    )}
  </div>
);
