import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { styled } from "@styles";
import React from "react";

import { AddressTile } from ".";

const Container = styled.div`
  max-width: 400px;
`;

const onEdit = action("onEdit");
const onRemove = action("onRemove");
const setDefault = action("setDefault");

const DEFAULT_PROPS = {
  address: {
    city: "Wroclaw",
    companyName: "Mirumee",
    country: {
      code: "PL",
      country: "Poland",
    },
    countryArea: "dolnyslask",
    firstName: "John",
    isDefaultBillingAddress: false,
    isDefaultShippingAddress: true,
    lastName: "Doe",
    phone: "555-5555",
    postalCode: "55-555",
    streetAddress1: "St Street",
    streetAddress2: "Second",
  },
  onEdit,
  onRemove,
  setDefault,
};

storiesOf("@components/molecules/AddressTile", module)
  .addParameters({ component: AddressTile })
  .add("default", () => (
    <Container>
      <AddressTile {...DEFAULT_PROPS} />
    </Container>
  ))
  .add("with default shipping and billing as false", () => {
    const CHANGED_DEFAULT_ADDRESSES = { ...DEFAULT_PROPS };
    CHANGED_DEFAULT_ADDRESSES.address.isDefaultBillingAddress = false;
    CHANGED_DEFAULT_ADDRESSES.address.isDefaultShippingAddress = false;
    return (
      <Container>
        <AddressTile {...CHANGED_DEFAULT_ADDRESSES} />
      </Container>
    );
  });
