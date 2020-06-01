import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { AddressGrid } from ".";

const onEdit = action("onEdit");
const onRemove = action("onRemove");
const setDefault = action("setDefault");

const DEFAULT_PROPS = {
  address: {
    city: "Wroclaw",
    companyName: "Mirumee",
    country: { code: "PL", country: "Poland" },
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
  id: "1",
  onEdit,
  onRemove,
  setDefault,
};

const addressSimple = {
  address: {
    city: "Wroclaw",
    companyName: "Mirumee",
    country: {
      code: "",
      country: "",
    },
    countryArea: "",
    firstName: "John",
    isDefaultBillingAddress: false,
    isDefaultShippingAddress: true,
    lastName: "Doe",
    phone: "",
    postalCode: "",
    streetAddress1: "St Street",
    streetAddress2: "Second",
  },
  id: "1",
  onEdit,
  onRemove,
  setDefault,
};

const addresses = [DEFAULT_PROPS, addressSimple, DEFAULT_PROPS, DEFAULT_PROPS];

storiesOf("@components/organisms/AddressGrid", module)
  .addParameters({ component: AddressGrid })
  .add("default", () => (
    <AddressGrid
      addNewAddress={action("addNewAddress")}
      addresses={addresses}
    />
  ));
