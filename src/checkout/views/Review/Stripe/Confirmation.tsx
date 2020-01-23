import React from "react";
import {
  CardElement,
  injectStripe,
  ReactStripeElements,
} from "react-stripe-elements";

import { PROVIDERS } from "../../../../core/config";
import { ProviderProps } from "../../Payment/View";

const Confirmation = ({ stripe }: ReactStripeElements.InjectedStripeProps) => {
  const [errors, setErrors] = React.useState([]);

  React.useEffect(() => {
    stripe.confirmCardPayment();

    // TODO: show modal somehow?
  }, []);

  return <div></div>;
};

export default injectStripe(Confirmation);
