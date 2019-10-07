import React from "react";
import {
  CardElement,
  injectStripe,
  ReactStripeElements
} from "react-stripe-elements";

import { ErrorMessage } from "@components/atoms";

import { PROVIDERS } from "../../../../../core/config";
import { ProviderProps } from "../../View";

const CardForm = ({
  formRef,
  processPayment,
  loading,
  checkout: { update },
  setLoadingState,
  stripe,
}: ProviderProps & ReactStripeElements.InjectedStripeProps) => {
  const [errors, setErrors] = React.useState([]);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoadingState(true);

    const payload = await stripe.createPaymentMethod("card");
    if (payload.error) {
      setErrors([payload.error]);
    } else {
      const { card, id } = payload.paymentMethod;
      update({
        cardData: {
          ccType: card.brand,
          lastDigits: card.last4,
          token: id,
        },
      });
      processPayment(id, PROVIDERS.STRIPE);
    }
    setLoadingState(false);
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <CardElement disabled={loading} onChange={() => setErrors([])} />
      <ErrorMessage errors={errors} />
    </form>
  );
};

export default injectStripe(CardForm);
