import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React, { ReactNode } from "react";
import styled from "styled-components";

import { AddressForm } from ".";

const Container = styled.div`
  width: 600px;
`;

const withContainer = (children: ReactNode) => (
  <Container> {children}</Container>
);

const NO_ERRORS: any = [];
const PROPS = {
  errors: NO_ERRORS,
  handleSubmit: action("handleSubmit"),
};

const ERRORS = {
  errors: [
    {
      field: "firstName",
      message: "This is error",
    },
    {
      field: "lastName",
      message: "This is error",
    },
  ],
  options: [
    { code: "PL", country: "Poland" },
    { code: "PT", country: "Portugal" },
    { code: "US", country: "United States of America" },
    { code: "DE", country: "Germany" },
    { code: "BE", country: "Belarus" },
    { code: "SE", country: "Sweden" },
    { code: "FR", country: "France" },
    { code: "CZ", country: "Czech Republic" },
    { code: "FI", country: "Finland" },
    { code: "GB", country: "Great Britain" },
  ],
};

const INITIAL_DATA = {
  address: {
    city: "New York",
    companyName: "Mirumee",
    country: {
      code: "US",
      country: "United States of America",
    },
    countryArea: "NY",
    firstName: "John",
    lastName: "Doe",
    phone: "555-55555",
    postalCode: "90210",
    streetAddress1: "Street line 1",
    streetAddress2: "Street line 2",
  },
};

storiesOf("@components/organisms/AddressForm", module)
  .add("default", () => withContainer(<AddressForm {...PROPS} />))
  .add("with errors", () =>
    withContainer(<AddressForm {...PROPS} {...ERRORS} />)
  )
  .add("with partial data", () =>
    withContainer(<AddressForm {...PROPS} {...INITIAL_DATA} />)
  );
