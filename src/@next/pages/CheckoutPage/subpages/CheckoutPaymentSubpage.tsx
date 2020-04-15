import React, {
  forwardRef,
  RefForwardingComponent,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { RouteComponentProps, useHistory } from "react-router";

import { CheckoutPayment } from "@components/organisms";
import { useCheckout, useUserDetails } from "@sdk/react";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { IAddress, ICardData } from "@types";

export interface ICheckoutPaymentSubpageHandles {
  submitPayment: () => void;
}
interface IProps extends RouteComponentProps<any> {
  selectedPaymentGateway?: string;
  selectedPaymentGatewayToken?: string;
  selectPaymentGateway?: (paymentGateway: string) => void;
}

const CheckoutPaymentSubpageWithRef: RefForwardingComponent<
  ICheckoutPaymentSubpageHandles,
  IProps
> = (
  {
    selectedPaymentGateway,
    selectedPaymentGatewayToken,
    selectPaymentGateway,
    ...props
  }: IProps,
  ref
) => {
  const history = useHistory();
  const { data: user } = useUserDetails();
  const {
    checkout,
    billingAsShipping,
    setBillingAddress,
    setBillingAsShippingAddress,
    selectedBillingAddressId,
    availablePaymentGateways,
    promoCodeDiscount,
    addPromoCode,
    removePromoCode,
    createPayment,
  } = useCheckout();
  const { countries } = useContext(ShopContext);

  const checkoutBillingAddress = checkout?.billingAddress
    ? {
        ...checkout?.billingAddress,
        phone: checkout?.billingAddress?.phone || undefined,
      }
    : undefined;
  const paymentGateways = availablePaymentGateways
    ? availablePaymentGateways
    : [];

  const checkoutBillingFormId = "billing-form";
  const checkoutBillingFormRef = useRef<HTMLFormElement>(null);
  const checkoutGatewayFormId = "gateway-form";
  const checkoutGatewayFormRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    submitPayment: () => {
      if (billingAsShipping) {
        checkoutGatewayFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else if (user && selectedBillingAddressId) {
        checkoutBillingFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        // TODO validate form
        checkoutBillingFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      }
    },
  }));

  const handleProcessPayment = async (
    gateway: string,
    token: string,
    cardData?: ICardData
  ) => {
    await createPayment(gateway, token, cardData);
    history.push(CHECKOUT_STEPS[2].nextStepLink);
  };
  const handleSetBillingAddress = async (
    address: IAddress,
    userAddressId?: string
  ) => {
    await setBillingAddress({
      ...address,
      id: userAddressId,
    });
    checkoutGatewayFormRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true })
    );
  };

  return (
    <CheckoutPayment
      {...props}
      formId={checkoutBillingFormId}
      formRef={checkoutBillingFormRef}
      userAddresses={user?.addresses}
      selectedUserAddressId={selectedBillingAddressId}
      checkoutBillingAddress={checkoutBillingAddress}
      countries={countries}
      paymentGateways={paymentGateways}
      selectedPaymentGateway={selectedPaymentGateway}
      selectedPaymentGatewayToken={selectedPaymentGatewayToken}
      selectPaymentGateway={selectPaymentGateway}
      setBillingAddress={handleSetBillingAddress}
      billingAsShippingAddress={billingAsShipping}
      setBillingAsShippingAddress={setBillingAsShippingAddress}
      promoCodeDiscount={{
        voucherCode: promoCodeDiscount?.voucherCode,
      }}
      addPromoCode={addPromoCode}
      removeVoucherCode={removePromoCode}
      gatewayFormRef={checkoutGatewayFormRef}
      processPayment={handleProcessPayment}
    />
  );
};

const CheckoutPaymentSubpage = forwardRef(CheckoutPaymentSubpageWithRef);

export { CheckoutPaymentSubpage };
