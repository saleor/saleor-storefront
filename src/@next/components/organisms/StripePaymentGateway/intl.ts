import { defineMessages } from "react-intl";

const description = "Stripe payment gateway error";

export const stripeErrorMessages = defineMessages({
  gatewayMisconfigured: {
    defaultMessage: "Stripe gateway misconfigured. Api key not provided.",
    description,
  },
  paymentSubmissionError: {
    defaultMessage:
      "Payment submission error. Stripe gateway returned no payment method in payload.",
    description,
  },
  geytwayDisplayError: {
    defaultMessage:
      "Stripe payment gateway couldn't be displayed. Stripe elements were not provided.",
    description,
  },
  paymentMethodNotCreated: {
    defaultMessage: "Payment method has not been created.",
    description,
  },
});
