import { useCheckout } from "@saleor/sdk";
import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { CheckoutShipping } from "@components/organisms";
import { IFormError } from "@types";

import {
  CheckoutStep,
  SubpageBaseProps,
  SubpageCompleteHandler,
} from "../utils";

const CheckoutShippingSubpageWithRef: RefForwardingComponent<
  SubpageCompleteHandler,
  SubpageBaseProps
> = ({ changeSubmitProgress, onSubmitSuccess }, ref) => {
  const checkoutShippingFormId = "shipping-form";
  const checkoutShippingFormRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState<IFormError[]>([]);

  const {
    checkout,
    availableShippingMethods,
    setShippingMethod,
  } = useCheckout();

  const shippingMethods = availableShippingMethods || [];

  useImperativeHandle(ref, () => () => {
    checkoutShippingFormRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true })
    );
  });

  const handleSetShippingMethod = async (shippingMethodId: string) => {
    changeSubmitProgress(true);
    const { dataError } = await setShippingMethod(shippingMethodId);
    const errors = dataError?.error;
    changeSubmitProgress(false);
    if (errors) {
      setErrors(errors);
    } else {
      setErrors([]);
      onSubmitSuccess(CheckoutStep.Shipping);
    }
  };

  return (
    <CheckoutShipping
      shippingMethods={shippingMethods}
      selectedShippingMethodId={checkout?.shippingMethod?.id}
      errors={errors}
      selectShippingMethod={handleSetShippingMethod}
      formId={checkoutShippingFormId}
      formRef={checkoutShippingFormRef}
    />
  );
};

const CheckoutShippingSubpage = forwardRef(CheckoutShippingSubpageWithRef);

export { CheckoutShippingSubpage };
