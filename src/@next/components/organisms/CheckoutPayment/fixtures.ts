import { GetShop_shop_countries } from "@temp/@sdk/queries/gqlTypes/GetShop";
import { IAddressWithAddressType, IPaymentGateway } from "@types";

const address: IAddressWithAddressType = {
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

const countries: GetShop_shop_countries[] = [
  { __typename: "CountryDisplay", code: "PL", country: "Poland" },
  { __typename: "CountryDisplay", code: "PT", country: "Portugal" },
  {
    __typename: "CountryDisplay",
    code: "US",
    country: "United States of America",
  },
  { __typename: "CountryDisplay", code: "DE", country: "Germany" },
  { __typename: "CountryDisplay", code: "BE", country: "Belarus" },
  { __typename: "CountryDisplay", code: "SE", country: "Sweden" },
  { __typename: "CountryDisplay", code: "FR", country: "France" },
  { __typename: "CountryDisplay", code: "CZ", country: "Czech Republic" },
  { __typename: "CountryDisplay", code: "FI", country: "Finland" },
  { __typename: "CountryDisplay", code: "GB", country: "Great Britain" },
];

export const paymentGateways: IPaymentGateway[] = [
  {
    config: [
      {
        field: "store_customer_card",
        value: "false",
      },
    ],
    id: "mirumee.payments.dummy",
    name: "Dummy",
  },
  {
    config: [
      {
        field: "api_key",
        value: "pk_test_6pRNASCoBOKtIshFeQd4XMUh",
      },
      {
        field: "store_customer_card",
        value: "false",
      },
    ],
    id: "mirumee.payments.stripe",
    name: "Stripe",
  },
];

export const LOGGED_IN_USER_PROPS = {
  billingAsShippingPossible: true,
  countries,
  paymentGateways,
  userAddresses: [
    {
      ...address,
    },
  ],
};

export const ANONYMOUS_USER_PROPS = {
  billingAsShippingPossible: true,
  checkoutBillingAddress: address,
  countries,
  paymentGateways,
};
