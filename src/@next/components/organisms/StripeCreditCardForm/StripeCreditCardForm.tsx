import { Formik } from "formik";
import React from "react";
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe,
} from "react-stripe-elements";

import { ErrorMessage } from "@components/atoms";
import { IFormError } from "@components/atoms/ErrorMessage/types";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Stripe credit card form.
 */
const StripeCreditCardFormContent: React.FC<IProps> = ({
  stripe,
  formRef,
  processPayment,
}: IProps) => {
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#87bbfd" },
        color: "#fff",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        fontWeight: 500,
        iconColor: "#c4f0ff",
      },
      invalid: {
        color: "#ffc7ee",
        iconColor: "#ffc7ee",
      },
    },
  };

  const [errors, setErrors] = React.useState<IFormError[]>([]);

  const handleFormSubmit = async () => {
    // setLoadingState(true);

    const payload = await stripe?.createPaymentMethod("card");
    if (payload?.error) {
      const error = { ...payload.error, message: payload.error.message || "" };
      setErrors([error]);
    } else if (payload?.paymentMethod) {
      const { card, id } = payload.paymentMethod;
      // update({
      //   cardData: {
      //     ccType: card.brand,
      //     lastDigits: card.last4,
      //     token: id,
      //   },
      // });
      processPayment(id);
    }
    // setLoadingState(false);
  };

  return (
    <Formik
      initialValues={null}
      onSubmit={async (values, { setSubmitting }) => {
        await handleFormSubmit();
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        isSubmitting,
        isValid,
      }) => (
        <S.Form ref={formRef} onSubmit={handleSubmit}>
          <S.Card>
            <S.Label>
              Card number
              <CardNumberElement
                onChange={event => {
                  handleChange(event);
                  setErrors([]);
                }}
              />
            </S.Label>
            <S.Label>
              Expiration date
              <CardExpiryElement
                onChange={event => {
                  handleChange(event);
                  setErrors([]);
                }}
              />
            </S.Label>
            <S.Label>
              CVC
              <CardCVCElement
                onChange={event => {
                  handleChange(event);
                  setErrors([]);
                }}
              />
            </S.Label>
            <S.Label>
              Postal code
              <input
                name="name"
                type="text"
                placeholder="94115"
                className="StripeElement"
                required
              />
            </S.Label>
          </S.Card>
          <ErrorMessage errors={errors} />
        </S.Form>
      )}
    </Formik>
  );
};

const StripeCreditCardForm = injectStripe(StripeCreditCardFormContent);

export { StripeCreditCardForm };
