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
