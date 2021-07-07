import { PaymentMethod, Stripe } from "@stripe/stripe-js";

interface StripeConfirmationData {
  client_secret: string;
  id: string;
}

export const parsePaymentConfirmationData = (confirmationData: string) => {
  try {
    const paymentAction = JSON.parse(
      confirmationData
    ) as StripeConfirmationData;
    return {
      paymentAction,
    };
  } catch (parseError) {
    return {
      parseError,
    };
  }
};

export const handleConfirmCardPayment = async (
  stripe: Stripe,
  paymentAction: StripeConfirmationData,
  paymentMethod: PaymentMethod
) => {
  try {
    const confirmation = await stripe.confirmCardPayment(
      paymentAction.client_secret,
      {
        payment_method: paymentMethod.id,
      }
    );
    return {
      confirmation,
    };
  } catch (confirmationError) {
    return {
      confirmationError,
    };
  }
};
