import { IAddressWithAddressType } from "@types";

import { Address } from "./types";

const formAddress: IAddressWithAddressType = {
  city: "Wroclaw",
  companyName: "Mirumee",
  country: {
    code: "PL",
    country: "Poland",
  },
  countryArea: "dolnyslask",
  firstName: "John",
  id: "12345",
  isDefaultBillingAddress: false,
  isDefaultShippingAddress: true,
  lastName: "Doe",
  phone: "555-5555",
  postalCode: "55-555",
  streetAddress1: "St Street",
  streetAddress2: "Second",
};

const userAddress: Address = {
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
  id: "12345",
};

const countries = [
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
];

export const LOGGED_IN_USER_PROPS = {
  countries,
  userAddresses: [
    {
      ...userAddress,
    },
  ],
};

export const ANONYMOUS_USER_PROPS = {
  checkoutAddress: formAddress,
  countries,
};
