import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
} from "react";
import { RouteComponentProps, useHistory } from "react-router";

import { CheckoutReview } from "@components/organisms";
import { statuses as dummyStatuses } from "@components/organisms/DummyPaymentGateway";
import { useCheckout } from "@sdk/react";
import { CHECKOUT_STEPS } from "@temp/core/config";

export interface ICheckoutReviewSubpageHandles {
  complete: () => void;
}
interface IProps extends RouteComponentProps<any> {
  selectedPaymentGatewayToken?: string;
}

const CheckoutReviewSubpageWithRef: RefForwardingComponent<
  ICheckoutReviewSubpageHandles,
  IProps
> = ({ selectedPaymentGatewayToken, ...props }: IProps, ref) => {
  const history = useHistory();
  const { checkout, payment, completeCheckout } = useCheckout();

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
    if (payment?.gateway === "Dummy") {
      return `Dummy: ${
        dummyStatuses.find(
          status => status.token === selectedPaymentGatewayToken
        )?.label
      }`;
    } else if (payment?.creditCard) {
      return `Ending in ${payment?.creditCard.lastDigits}`;
    }
    return ``;
  };

  useImperativeHandle(ref, () => ({
    complete: async () => {
      const { data } = await completeCheckout();
      history.push({
        pathname: CHECKOUT_STEPS[3].nextStepLink,
        state: {
          id: data?.id,
          orderNumber: data?.number,
          token: data?.token,
        },
      });
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
    />
  );
};

const CheckoutReviewSubpage = forwardRef(CheckoutReviewSubpageWithRef);

export { CheckoutReviewSubpage };
