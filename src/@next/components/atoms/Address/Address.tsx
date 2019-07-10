import { Trans } from "@lingui/react";
import React from "react";

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
