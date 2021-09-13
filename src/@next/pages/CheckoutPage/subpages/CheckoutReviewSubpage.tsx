import { OrderStatus, useCheckout } from "@saleor/sdk";
import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useState,
} from "react";

import { CheckoutReview } from "@components/organisms";
import { statuses as dummyStatuses } from "@components/organisms/DummyPaymentGateway";
import { paymentGatewayNames } from "@temp/constants";
import { IFormError } from "@types";

import {
  CheckoutStep,
  SubpageBaseProps,
  SubpageCompleteHandler,
} from "../utils";

export interface ISubmitCheckoutData {
  id: string;
  orderNumber: string;
  token: string;
  orderStatus: OrderStatus;
}

interface CheckoutReviewSubpageProps extends SubpageBaseProps {
  selectedPaymentGatewayToken?: string;
  paymentGatewayFormRef: React.RefObject<HTMLFormElement>;
}

const CheckoutReviewSubpageWithRef: RefForwardingComponent<
  SubpageCompleteHandler,
  CheckoutReviewSubpageProps
> = (
  {
    selectedPaymentGatewayToken,
    paymentGatewayFormRef,
    changeSubmitProgress,
    onSubmitSuccess,
  },
  ref
) => {
  const { checkout, payment, completeCheckout } = useCheckout();

  const [errors, setErrors] = useState<IFormError[]>([]);

  const checkoutShippingAddress = checkout?.shippingAddress
    ? {
        ...checkout?.shippingAddress,
        phone: checkout?.shippingAddress?.phone || undefined,
      }
    : undefined;

  const checkoutBillingAddress = checkout?.billingAddress
    ? {
        ...checkout?.billingAddress,
        phone: checkout?.billingAddress?.phone || undefined,
      }
    : undefined;

  const getPaymentMethodDescription = () => {
    if (payment?.gateway === paymentGatewayNames.dummy) {
      return `Dummy: ${
        dummyStatuses.find(
          status => status.token === selectedPaymentGatewayToken
        )?.label
      }`;
    }
    if (payment?.gateway === paymentGatewayNames.adyen) {
      return `Adyen payments`;
    }
    if (payment?.creditCard) {
      return `Ending in ${payment?.creditCard.lastDigits}`;
    }
    return ``;
  };

  useImperativeHandle(ref, () => async () => {
    changeSubmitProgress(true);
    let data;
    let dataError;
    if (payment?.gateway === paymentGatewayNames.adyen) {
      paymentGatewayFormRef.current?.dispatchEvent(
        new Event("submitComplete", { cancelable: true })
      );
    } else if (payment?.gateway === paymentGatewayNames.stripe) {
      paymentGatewayFormRef.current?.dispatchEvent(
        new Event("submitComplete", { cancelable: true })
      );
    } else {
      const response = await completeCheckout();
      data = response.data;
      dataError = response.dataError;
      changeSubmitProgress(false);
      const errors = dataError?.error;
      if (errors) {
        setErrors(errors);
      } else {
        setErrors([]);
        onSubmitSuccess(CheckoutStep.Review, {
          id: data?.order?.id,
          orderStatus: data?.order?.status,
          orderNumber: data?.order?.number,
          token: data?.order?.token,
        });
      }
    }
  });

  return (
    <CheckoutReview
      shippingAddress={checkoutShippingAddress}
      billingAddress={checkoutBillingAddress}
      shippingMethodName={checkout?.shippingMethod?.name}
      paymentMethodName={getPaymentMethodDescription()}
      email={checkout?.email}
      errors={errors}
    />
  );
};

const CheckoutReviewSubpage = forwardRef(CheckoutReviewSubpageWithRef);

export { CheckoutReviewSubpage };
