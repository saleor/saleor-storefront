import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useState,
} from "react";
import { RouteComponentProps } from "react-router";

import { CheckoutReview } from "@components/organisms";
import { statuses as dummyStatuses } from "@components/organisms/DummyPaymentGateway";
import { useCheckout } from "@saleor/sdk";
import { IFormError } from "@types";

export interface ISubmitCheckoutData {
  id: string;
  orderNumber: string;
  token: string;
}

export interface ICheckoutReviewSubpageHandles {
  complete: () => void;
}

interface IProps extends RouteComponentProps<any> {
  selectedPaymentGatewayToken?: string;
  paymentGatewayFormRef: React.RefObject<HTMLFormElement>;
  changeSubmitProgress: (submitInProgress: boolean) => void;
  onSubmitSuccess: (data: ISubmitCheckoutData) => void;
}

const CheckoutReviewSubpageWithRef: RefForwardingComponent<
  ICheckoutReviewSubpageHandles,
  IProps
> = (
  {
    selectedPaymentGatewayToken,
    paymentGatewayFormRef,
    changeSubmitProgress,
    onSubmitSuccess,
    ...props
  }: IProps,
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
    if (payment?.gateway === "mirumee.payments.dummy") {
      return `Dummy: ${
        dummyStatuses.find(
          status => status.token === selectedPaymentGatewayToken
        )?.label
      }`;
    }
    if (payment?.gateway === "mirumee.payments.adyen") {
      return `Adyen payments`;
    }
    if (payment?.creditCard) {
      return `Ending in ${payment?.creditCard.lastDigits}`;
    }
    return ``;
  };

  useImperativeHandle(ref, () => ({
    complete: async () => {
      changeSubmitProgress(true);
      let data;
      let dataError;
      if (payment?.gateway === "mirumee.payments.adyen") {
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
          onSubmitSuccess({
            id: data?.order?.id,
            orderNumber: data?.order?.number,
            token: data?.order?.token,
          });
        }
      }
    },
  }));

  return (
    <CheckoutReview
      {...props}
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
