import { CardNumberElement, Elements } from "@stripe/react-stripe-js";
import {
  loadStripe,
  PaymentMethod,
  Stripe,
  StripeElements,
} from "@stripe/stripe-js";
import React, { useEffect, useMemo, useState } from "react";
import { defineMessages, useIntl } from "react-intl";

import { paymentStatusMessages } from "@temp/intl";
import { IFormError } from "@types";

import { StripeCreditCardForm } from "../StripeCreditCardForm";
import { IProps } from "./types";

const messageDescription = "Stripe payment gateway error";

export const stripeErrorMessages = defineMessages({
  gatewayMisconfigured: {
    defaultMessage: "Stripe gateway misconfigured. Api key not provided.",
    description: messageDescription,
  },
  paymentSubmissionError: {
    defaultMessage:
      "Payment submission error. Stripe gateway returned no payment method in payload.",
    description: messageDescription,
  },
  geytwayDisplayError: {
    defaultMessage:
      "Stripe payment gateway couldn't be displayed. Stripe elements were not provided.",
    description: messageDescription,
  },
  paymentMethodNotCreated: {
    defaultMessage: "Payment method has not been created.",
    description: messageDescription,
  },
});

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

  const apiKey = config.find(({ field }) => field === "api_key")?.value;

  const stripePromise = useMemo(() => {
    if (apiKey) {
      return loadStripe(apiKey);
    }
    const stripeApiKeyErrors = [
      new Error(intl.formatMessage(stripeErrorMessages.gatewayMisconfigured)),
    ];
    setSubmitErrors(stripeApiKeyErrors);
    onError(stripeApiKeyErrors);
    return null;
  }, [apiKey]);

  const handleFormSubmit = async (
    stripe: Stripe | null,
    elements: StripeElements | null
  ) => {
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
          setPaymentMethod(payload.paymentMethod);
        }
      } else {
        const stripePayloadErrors = [
          new Error(
            intl.formatMessage(stripeErrorMessages.paymentSubmissionError)
          ),
        ];
        setSubmitErrors(stripePayloadErrors);
        onError(stripePayloadErrors);
      }
    } else {
      const stripeElementsErrors = [
        new Error(intl.formatMessage(stripeErrorMessages.geytwayDisplayError)),
      ];
      setSubmitErrors(stripeElementsErrors);
      onError(stripeElementsErrors);
    }
  };

  const handleFormCompleteSubmit = async () => {
    const stripe = await stripePromise;

    const payment = await submitPayment();

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
      if (!paymentMethod?.id) {
        onError([
          new Error(
            intl.formatMessage(stripeErrorMessages.paymentMethodNotCreated)
          ),
        ]);
        return;
      }
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
