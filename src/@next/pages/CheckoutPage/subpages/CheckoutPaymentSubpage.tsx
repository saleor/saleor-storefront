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

import { CheckoutPayment } from "@components/organisms";
import { useCart, useCheckout, useUserDetails } from "@sdk/react";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { IAddress, ICardData, IFormError } from "@types";
import { filterNotEmptyArrayItems } from "@utils/misc";

export interface ICheckoutPaymentSubpageHandles {
  submitPayment: () => void;
}
interface IProps extends RouteComponentProps<any> {
  selectedPaymentGateway?: string;
  selectedPaymentGatewayToken?: string;
  selectPaymentGateway: (paymentGateway: string) => void;
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
  const { items } = useCart();
  const { countries } = useContext(ShopContext);

  const isShippingRequiredForProducts =
    items &&
    items.some(
      ({ variant }) => variant.product?.productType.isShippingRequired
    );

  const [billingErrors, setBillingErrors] = useState<IFormError[]>([]);
  const [gatewayErrors, setGatewayErrors] = useState<IFormError[]>([]);
  const [promoCodeErrors, setPromoCodeErrors] = useState<IFormError[]>([]);

  const [billingAsShippingState, setBillingAsShippingState] = useState(
    billingAsShipping
  );
  useEffect(() => {
    setBillingAsShippingState(billingAsShipping);
  }, [billingAsShipping]);

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
  const checkoutNewAddressFormId = "new-address-form";

  useImperativeHandle(ref, () => ({
    submitPayment: () => {
      if (billingAsShippingState) {
        handleSetBillingAddress();
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
    const { dataError } = await createPayment(gateway, token, cardData);
    const errors = dataError?.error.extraInfo.userInputErrors;
    if (errors) {
      setGatewayErrors(errors);
    } else {
      setGatewayErrors([]);
      history.push(CHECKOUT_STEPS[2].nextStepLink);
    }
  };
  const handleSetBillingAddress = async (
    address?: IAddress,
    email?: string,
    userAddressId?: string
  ) => {
    let billingEmail;
    if (user && userAddressId) {
      billingEmail = user?.email;
    } else if (email) {
      billingEmail = email;
    } else {
      billingEmail = "";
    }

    let errors;
    if (billingAsShippingState && isShippingRequiredForProducts) {
      const { dataError } = await setBillingAsShippingAddress();
      errors = dataError?.error.extraInfo.userInputErrors;
    } else {
      const { dataError } = await setBillingAddress(
        {
          ...address,
          id: userAddressId,
        },
        billingEmail
      );
      errors = dataError?.error.extraInfo.userInputErrors;
    }
    if (errors) {
      setBillingErrors(errors);
    } else {
      setBillingErrors([]);
      checkoutGatewayFormRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    }
  };
  const handleAddPromoCode = async (promoCode: string) => {
    const { dataError } = await addPromoCode(promoCode);
    const errors = dataError?.error.extraInfo.userInputErrors;
    if (errors) {
      setPromoCodeErrors(errors);
    } else {
      setPromoCodeErrors([]);
    }
  };
  const handleRemovePromoCode = async (promoCode: string) => {
    const { dataError } = await removePromoCode(promoCode);
    const errors = dataError?.error.extraInfo.userInputErrors;
    if (errors) {
      setPromoCodeErrors(errors);
    } else {
      setPromoCodeErrors([]);
    }
  };

  return (
    <CheckoutPayment
      {...props}
      billingErrors={billingErrors}
      gatewayErrors={gatewayErrors}
      billingFormId={checkoutBillingFormId}
      billingFormRef={checkoutBillingFormRef}
      userAddresses={user?.addresses
        ?.filter(filterNotEmptyArrayItems)
        .map(
          ({
            isDefaultBillingAddress,
            isDefaultShippingAddress,
            phone,
            ...address
          }) => ({
            ...address,
            isDefaultBillingAddress: !!isDefaultBillingAddress,
            isDefaultShippingAddress: !!isDefaultShippingAddress,
            phone: phone ? phone : undefined,
          })
        )}
      selectedUserAddressId={selectedBillingAddressId}
      checkoutBillingAddress={checkoutBillingAddress}
      countries={countries}
      paymentGateways={paymentGateways}
      selectedPaymentGateway={selectedPaymentGateway}
      selectedPaymentGatewayToken={selectedPaymentGatewayToken}
      selectPaymentGateway={selectPaymentGateway}
      setBillingAddress={handleSetBillingAddress}
      billingAsShippingPossible={!!isShippingRequiredForProducts}
      billingAsShippingAddress={billingAsShippingState}
      setBillingAsShippingAddress={setBillingAsShippingState}
      promoCodeDiscount={{
        voucherCode: promoCodeDiscount?.voucherCode,
      }}
      addPromoCode={handleAddPromoCode}
      removeVoucherCode={handleRemovePromoCode}
      promoCodeErrors={promoCodeErrors}
      gatewayFormId={checkoutGatewayFormId}
      gatewayFormRef={checkoutGatewayFormRef}
      userId={user?.id}
      newAddressFormId={checkoutNewAddressFormId}
      processPayment={handleProcessPayment}
    />
  );
};

const CheckoutPaymentSubpage = forwardRef(CheckoutPaymentSubpageWithRef);

export { CheckoutPaymentSubpage };
