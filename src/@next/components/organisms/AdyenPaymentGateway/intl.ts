import { defineMessages, IntlShape } from "react-intl";

const description = "Adyen payment gateway error";

export const adyenErrorMessages = defineMessages({
  unknownPayment: {
    defaultMessage: "Unknown payment submission error occured.",
    description,
  },
  invalidPaymentSubmission: {
    defaultMessage: "Invalid payment submission.",
    description,
  },
});

export const adyenConfirmationErrorMessages = defineMessages({
  error: {
    defaultMessage: "Error processing payment occured.",
    description,
  },
  refused: {
    defaultMessage:
      "The payment was refused. Try the payment again using a different payment method or card.",
    description,
  },
  cancelled: {
    defaultMessage: "Payment was cancelled.",
    description,
  },
  general: {
    defaultMessage: "Payment could not be confirmed.",
    description,
  },
});

export function translateAdyenConfirmationError(
  status: string,
  intl: IntlShape
): string {
  switch (status) {
    case "Error":
      return intl.formatMessage(adyenConfirmationErrorMessages.error);
    case "Refused":
      return intl.formatMessage(adyenConfirmationErrorMessages.refused);
    case "Cancelled":
      return intl.formatMessage(adyenConfirmationErrorMessages.cancelled);
    default:
      return intl.formatMessage(adyenConfirmationErrorMessages.general);
  }
}
