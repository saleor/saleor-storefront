import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
} from "react";
import { RouteComponentProps, useHistory } from "react-router";

import { CheckoutShipping } from "@components/organisms";
import { useCheckout } from "@sdk/react";
import { CHECKOUT_STEPS } from "@temp/core/config";

export interface ICheckoutShippingSubpageHandles {
  submitShipping: () => void;
}

const CheckoutShippingSubpageWithRef: RefForwardingComponent<
  ICheckoutShippingSubpageHandles,
  RouteComponentProps<any>
> = ({ ...props }: RouteComponentProps<any>, ref) => {
  const history = useHistory();
  const {
    checkout,
    availableShippingMethods,
    setShippingMethod,
  } = useCheckout();

  const shippingMethods = availableShippingMethods
    ? availableShippingMethods
    : [];

  useImperativeHandle(ref, () => ({
    submitShipping: () => {
      history.push(CHECKOUT_STEPS[1].nextStepLink);
    },
  }));

  const handleSetShippingMethod = async (shippingMethodId: string) => {
    await setShippingMethod(shippingMethodId);
  };

  return (
    <CheckoutShipping
      {...props}
      shippingMethods={shippingMethods}
      selectedShippingMethodId={checkout?.shippingMethod?.id}
      selectShippingMethod={handleSetShippingMethod}
    />
  );
};

const CheckoutShippingSubpage = forwardRef(CheckoutShippingSubpageWithRef);

export { CheckoutShippingSubpage };
