import React, {
  forwardRef,
  RefForwardingComponent,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { RouteComponentProps, useHistory } from "react-router";

import { CheckoutAddress } from "@components/organisms";
import { useCheckout, useUserDetails } from "@sdk/react";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { IAddress } from "@types";

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
  } = useCheckout();
  const { countries } = useContext(ShopContext);

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
    let shippingEmail;
    if (user && userAddressId) {
      shippingEmail = user?.email;
    } else if (email) {
      shippingEmail = email;
    } else {
      return;
    }

    await setShippingAddress(
      {
        ...address,
        id: userAddressId,
      },
      shippingEmail
    );
    history.push(CHECKOUT_STEPS[0].nextStepLink);
  };

  return (
    <CheckoutAddress
      {...props}
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
