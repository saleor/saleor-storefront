import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { RouteComponentProps } from "react-router";

import { CheckoutShipping } from "@components/organisms";
import { useCheckout } from "@saleor/sdk";
import { IFormError } from "@types";

export interface ICheckoutShippingSubpageHandles {
  submitShipping: () => void;
}

interface IProps extends RouteComponentProps<any> {
  changeSubmitProgress: (submitInProgress: boolean) => void;
  onSubmitSuccess: () => void;
}

const CheckoutShippingSubpageWithRef: RefForwardingComponent<
  ICheckoutShippingSubpageHandles,
  IProps
> = ({ changeSubmitProgress, onSubmitSuccess, ...props }: IProps, ref) => {
  const checkoutShippingFormId = "shipping-form";
  const checkoutShippingFormRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState<IFormError[]>([]);

  const {
    checkout,
    availableShippingMethods,
    setShippingMethod,
  } = useCheckout();

  const shippingMethods = availableShippingMethods || [];

  useImperativeHandle(ref, () => ({
    submitShipping: () => {
      checkoutShippingFormRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    },
  }));

  const handleSetShippingMethod = async (shippingMethodId: string) => {
    changeSubmitProgress(true);
    const { dataError } = await setShippingMethod(shippingMethodId);
    const errors = dataError?.error;
    changeSubmitProgress(false);
    if (errors) {
      setErrors(errors);
    } else {
      setErrors([]);
      onSubmitSuccess();
    }
  };

  return (
    <CheckoutShipping
      {...props}
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
