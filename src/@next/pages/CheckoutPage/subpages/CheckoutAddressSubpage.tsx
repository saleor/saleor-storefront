import React, {
  forwardRef,
  RefForwardingComponent,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { RouteComponentProps, useHistory } from "react-router";

import { CheckoutAddress } from "@components/organisms";
import { ErrorTypes } from "@sdk/helpers";
import { ErrorCheckoutTypes } from "@sdk/jobs";
import { ApolloErrorWithUserInput } from "@sdk/network/types";
import { useCheckout, useUserDetails } from "@sdk/react";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { IAddress, IFormError } from "@types";

export interface ICheckoutAddressSubpageHandles {
  submitAddress: () => void;
}

const CheckoutAddressSubpageWithRef: RefForwardingComponent<
  ICheckoutAddressSubpageHandles,
  RouteComponentProps<any>
> = ({ ...props }: RouteComponentProps<any>, ref) => {
  const checkoutAddressFormId = "address-form";
  const checkoutAddressFormRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    submitAddress: () => {
      if (user && selectedShippingAddressId) {
        checkoutAddressFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        // TODO validate form
        checkoutAddressFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      }
    },
  }));

  const history = useHistory();
  const { data: user } = useUserDetails();
  const {
    checkout,
    setShippingAddress,
    selectedShippingAddressId,
    addOnErrorListener,
    removeOnErrorListener,
  } = useCheckout();
  const { countries } = useContext(ShopContext);

  const [errors, setErrors] = useState<IFormError[]>([]);

  useEffect(() => {
    addOnErrorListener(onErrorListener);
    return () => {
      removeOnErrorListener(onErrorListener);
    };
  }, []);

  const onErrorListener = (
    error: ApolloErrorWithUserInput,
    type: ErrorTypes
  ) => {
    const errors = error.extraInfo.userInputErrors;
    if (type === ErrorCheckoutTypes.SET_SHIPPING_ADDRESS && errors) {
      setErrors(errors);
    }
  };

  const checkoutShippingAddress = checkout?.shippingAddress
    ? {
        ...checkout?.shippingAddress,
        phone: checkout?.shippingAddress?.phone || undefined,
      }
    : undefined;

  const handleSetShippingAddress = async (
    address: IAddress,
    email?: string,
    userAddressId?: string
  ) => {
    setErrors([]);

    let shippingEmail;
    if (user && userAddressId) {
      shippingEmail = user?.email;
    } else if (email) {
      shippingEmail = email;
    } else {
      return;
    }

    const { data } = await setShippingAddress(
      {
        ...address,
        id: userAddressId,
      },
      shippingEmail
    );
    if (data) {
      history.push(CHECKOUT_STEPS[0].nextStepLink);
    }
  };

  return (
    <CheckoutAddress
      {...props}
      errors={errors}
      formId={checkoutAddressFormId}
      formRef={checkoutAddressFormRef}
      checkoutAddress={checkoutShippingAddress}
      email={checkout?.email}
      userAddresses={user?.addresses}
      selectedUserAddressId={selectedShippingAddressId}
      countries={countries}
      setShippingAddress={handleSetShippingAddress}
    />
  );
};

const CheckoutAddressSubpage = forwardRef(CheckoutAddressSubpageWithRef);

export { CheckoutAddressSubpage };
