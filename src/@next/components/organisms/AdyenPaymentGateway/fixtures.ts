export const adyenPaymentMethods = {
  groups: [
    {
      name: "Credit Card",
      types: [
        "mc",
        "visa",
        "amex",
        "maestro",
        "amex_applepay",
        "cup",
        "diners",
        "discover",
        "jcb",
        "mc_applepay",
      ],
    },
  ],
  paymentMethods: [
    {
      details: [
        {
          key: "number",
          type: "text",
        },
        {
          key: "expiryMonth",
          type: "text",
        },
        {
          key: "expiryYear",
          type: "text",
        },
        {
          key: "cvc",
          type: "text",
        },
        {
          key: "holderName",
          optional: true,
          type: "text",
        },
      ],
      name: "Credit Card",
      type: "scheme",
    },
    {
      details: [
        {
          items: [
            {
              id: "1121",
              name: "Test Issuer",
            },
            {
              id: "1154",
              name: "Test Issuer 5",
            },
            {
              id: "1153",
              name: "Test Issuer 4",
            },
            {
              id: "1152",
              name: "Test Issuer 3",
            },
            {
              id: "1151",
              name: "Test Issuer 2",
            },
            {
              id: "1162",
              name: "Test Issuer Cancelled",
            },
            {
              id: "1161",
              name: "Test Issuer Pending",
            },
            {
              id: "1160",
              name: "Test Issuer Refused",
            },
            {
              id: "1159",
              name: "Test Issuer 10",
            },
            {
              id: "1158",
              name: "Test Issuer 9",
            },
            {
              id: "1157",
              name: "Test Issuer 8",
            },
            {
              id: "1156",
              name: "Test Issuer 7",
            },
            {
              id: "1155",
              name: "Test Issuer 6",
            },
          ],
          key: "issuer",
          type: "select",
        },
      ],
      name: "iDEAL",
      supportsRecurring: true,
      type: "ideal",
    },
    {
      name: "PayPal",
      supportsRecurring: true,
      type: "paypal",
    },
    {
      details: [
        {
          key: "sepa.ownerName",
          type: "text",
        },
        {
          key: "sepa.ibanNumber",
          type: "text",
        },
      ],
      name: "SEPA Direct Debit",
      supportsRecurring: true,
      type: "sepadirectdebit",
    },
    {
      name: "Paysafecard",
      supportsRecurring: true,
      type: "paysafecard",
    },
    {
      name: "Generic GiftCard",
      supportsRecurring: false,
      type: "genericgiftcard",
    },
    {
      name: "UnionPay",
      supportsRecurring: true,
      type: "unionpay",
    },
  ],
};
