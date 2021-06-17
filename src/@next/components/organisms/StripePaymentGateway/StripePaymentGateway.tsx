import {
  CardElement,
  CardNumberElement,
  Elements,
} from "@stripe/react-stripe-js";
import {
  loadStripe,
  PaymentIntent,
  PaymentMethod,
  Stripe,
  StripeCardElement,
  StripeElements,
} from "@stripe/stripe-js";
import React, { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";

import { paymentStatusMessages } from "@temp/intl";
import { IFormError } from "@types";

import { StripeCreditCardForm } from "../StripeCreditCardForm";
import { IProps } from "./types";

interface StripeConfirmationData {
  client_secret: string;
  id: string;
}

/**
 * Stripe payment gateway.
 */
const StripePaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  submitPayment,
  submitPaymentSuccess,
  formRef,
  formId,
  errors = [],
  onError,
}: IProps) => {
  const intl = useIntl();

  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();

  console.log("stripe GLOBAL paymentMethod", paymentMethod);

  const apiKey = config.find(({ field }) => field === "api_key")?.value;

  const stripePromise = useMemo(() => {
    if (apiKey) {
      return loadStripe(apiKey);
    }
    const stripeApiKeyErrors = [
      {
        message: "Stripe gateway misconfigured. Api key not provided.",
      },
    ];
    setSubmitErrors(stripeApiKeyErrors);
    onError(stripeApiKeyErrors);
    return null;
  }, [apiKey]);

  const handleFormSubmit = async (
    stripe: Stripe | null,
    elements: StripeElements | null
  ) => {
    console.log("stripe handleFormSubmit");

    const cartNumberElement = elements?.getElement(CardNumberElement);

    if (cartNumberElement) {
      const payload = await stripe?.createPaymentMethod({
        card: cartNumberElement,
        type: "card",
      });
      if (payload?.error) {
        const errors = [
          {
            ...payload.error,
            message: payload.error.message || "",
          },
        ];
        setSubmitErrors(errors);
        onError(errors);
      } else if (payload?.paymentMethod) {
        const { card, id } = payload.paymentMethod;
        if (card?.brand && card?.last4) {
          processPayment(id, {
            brand: card?.brand,
            expMonth: card?.exp_month || null,
            expYear: card?.exp_year || null,
            firstDigits: null,
            lastDigits: card?.last4,
          });
          console.log("stripe setPaymentMethod", payload.paymentMethod);
          setPaymentMethod(payload.paymentMethod);
        }
      } else {
        const stripePayloadErrors = [
          {
            message:
              "Payment submission error. Stripe gateway returned no payment method in payload.",
          },
        ];
        setSubmitErrors(stripePayloadErrors);
        onError(stripePayloadErrors);
      }
    } else {
      const stripeElementsErrors = [
        {
          message:
            "Stripe gateway improperly rendered. Stripe elements were not provided.",
        },
      ];
      setSubmitErrors(stripeElementsErrors);
      onError(stripeElementsErrors);
    }
  };

  const handleFormCompleteSubmit = async () => {
    console.log("stripe handleFormCompleteSubmit 1");

    const stripe = await stripePromise;

    const payment = await submitPayment();

    console.log("stripe handleFormCompleteSubmit 2", payment);

    if (payment.errors?.length) {
      onError(payment.errors);
    } else if (!payment?.confirmationNeeded) {
      submitPaymentSuccess(payment?.order);
    } else if (!stripe?.confirmCardPayment) {
      onError([
        new Error(
          intl.formatMessage(
            paymentStatusMessages.cannotHandlePaymentConfirmation
          )
        ),
      ]);
    } else if (!payment?.confirmationData) {
      onError([
        new Error(
          intl.formatMessage(paymentStatusMessages.paymentNoConfirmationData)
        ),
      ]);
    } else {
      let paymentAction;
      try {
        paymentAction = JSON.parse(
          payment.confirmationData
        ) as StripeConfirmationData;
      } catch (parseError) {
        onError([
          new Error(
            intl.formatMessage(
              paymentStatusMessages.paymentMalformedConfirmationData
            )
          ),
        ]);
        return;
      }
      console.log("stripe paymentMethod", paymentMethod);
      if (!paymentMethod?.id) {
        console.log("stripe handleFormCompleteSubmit no card", paymentAction);
        return;
      }
      console.log("stripe handleFormCompleteSubmit 3", paymentAction);
      let confirmation;
      try {
        confirmation = await stripe.confirmCardPayment(
          paymentAction.client_secret,
          {
            payment_method: paymentMethod.id,
          }
        );
      } catch (error) {
        onError([new Error(error)]);
        return;
      }
      if (confirmation.error) {
        onError([new Error(confirmation.error.message)]);
      } else {
        handleFormCompleteSubmit();
      }
    }
  };

  useEffect(() => {
    if (stripePromise) {
      (formRef?.current as any)?.addEventListener(
        "submitComplete",
        handleFormCompleteSubmit
      );
    }
    return () => {
      (formRef?.current as any)?.removeEventListener(
        "submitComplete",
        handleFormCompleteSubmit
      );
    };
  }, [formRef, stripePromise, paymentMethod]);

  const allErrors = [...errors, ...submitErrors];

  return (
    <div data-test="stripeGateway">
      <Elements stripe={stripePromise}>
        <StripeCreditCardForm
          formId={formId}
          formRef={formRef}
          errors={allErrors}
          onSubmit={handleFormSubmit}
        />
      </Elements>
    </div>
  );
};

export { StripePaymentGateway };
