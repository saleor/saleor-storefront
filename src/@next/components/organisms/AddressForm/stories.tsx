import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React, { ReactNode } from "react";
import styled from "styled-components";

import { AddressForm } from ".";
import { address, countries } from "./fixtures";

const Container = styled.div`
  width: 600px;
`;

const withContainer = (children: ReactNode) => (
  <Container>{children}</Container>
);

const NO_ERRORS: any = [];
const PROPS = {
  countriesOptions: countries,
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
};

const INITIAL_DATA = {
  address,
};

storiesOf("@components/organisms/AddressForm", module)
  .addParameters({ component: AddressForm })
  .add("default", () => withContainer(<AddressForm {...PROPS} />))
  .add("with errors", () =>
    withContainer(<AddressForm {...PROPS} {...ERRORS} />)
  )
  .add("with partial data", () =>
    withContainer(<AddressForm {...PROPS} {...INITIAL_DATA} />)
  );
