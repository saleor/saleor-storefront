import React, { useContext, useEffect, useRef, useState } from "react";
import { RouteComponentProps, useHistory, useLocation } from "react-router-dom";

import { Button, Loader } from "@components/atoms";
import { CheckoutProgressBar } from "@components/molecules";
import {
  CartSummary,
  CheckoutAddress,
  CheckoutPayment,
  CheckoutReview,
  CheckoutShipping,
} from "@components/organisms";
import { statuses as dummyStatuses } from "@components/organisms/DummyPaymentGateway";
import { Checkout } from "@components/templates";
import { useCheckoutStepState } from "@hooks";
import { useCart, useCheckout, useUserDetails } from "@sdk/react";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { IAddress } from "@types";

import { CheckoutRouter } from "./CheckoutRouter";
import { IProps } from "./types";

const CheckoutPage: React.FC<IProps> = ({}: IProps) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { data: user } = useUserDetails();
  const {
    loaded: cartLoaded,
    shippingPrice,
    discount,
    subtotalPrice,
    totalPrice,
    items,
  } = useCart();
  const {
    loaded: checkoutLoaded,
    checkout,
    billingAsShipping,
    setShippingAddress,
    setBillingAddress,
    setBillingAsShippingAddress,
    selectedShippingAddressId,
    selectedBillingAddressId,
    availableShippingMethods,
    setShippingMethod,
    availablePaymentGateways,
    promoCodeDiscount,
    addPromoCode,
    removePromoCode,
    payment,
    createPayment,
    completeCheckout,
    addOnErrorListener,
    removeOnErrorListener,
  } = useCheckout();
  const { countries } = useContext(ShopContext);
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<
    string | undefined
  >(payment?.gateway);
  const [
    selectedPaymentGatewayToken,
    setSelectedPaymentGatewayToken,
  ] = useState<string | undefined>(payment?.token);

  useEffect(() => {
    setSelectedPaymentGateway(payment?.gateway);
  }, [payment?.gateway]);
  useEffect(() => {
    setSelectedPaymentGatewayToken(payment?.token);
  }, [payment?.token]);

  useEffect(() => {
    addOnErrorListener(onErrorListener);
    return () => {
      removeOnErrorListener(onErrorListener);
    };
  }, []);

  const onErrorListener = (error: any) => {
    console.log("CheckoutPage error");
    console.log(error);
  };

  const activeStepIndex = CHECKOUT_STEPS.findIndex(
    ({ link }) => link === pathname
  );
  const activeStep = CHECKOUT_STEPS[activeStepIndex];
  const products = items?.map(({ id, variant, totalPrice, quantity }) => ({
    id: id || "",
    name: variant.name || "",
    price: {
      gross: {
        amount: totalPrice?.gross.amount || 0,
        currency: totalPrice?.gross.currency || "",
      },
      net: {
        amount: totalPrice?.net.amount || 0,
        currency: totalPrice?.net.currency || "",
      },
    },
    quantity,
    sku: variant.sku || "",
    thumbnail: {
      alt: variant.product?.thumbnail?.alt || undefined,
      url: variant.product?.thumbnail?.url,
      url2x: variant.product?.thumbnail2x?.url,
    },
  }));

  const checkoutAddressFormId = "address-form";
  const checkoutAddressFormRef = useRef<HTMLFormElement>(null);
  const checkoutBillingFormId = "billing-form";
  const checkoutBillingFormRef = useRef<HTMLFormElement>(null);
  const checkoutGatewayFormId = "gateway-form";
  const checkoutGatewayFormRef = useRef<HTMLFormElement>(null);

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
    history.push(activeStep.nextStepLink);
  };
  const handleSetShippingMethod = async (shippingMethodId: string) => {
    await setShippingMethod(shippingMethodId);
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
  const handleProcessPayment = async (gateway: string, token: string) => {
    await createPayment(gateway, token);
    history.push(activeStep.nextStepLink);
  };
  const handleCompleteCheckout = async () => {
    const { data } = await completeCheckout();
    history.push({
      pathname: activeStep.nextStepLink,
      state: {
        id: data?.id,
        orderNumber: data?.number,
        token: data?.token,
      },
    });
  };
  const handleNextStepClick = () => {
    if (activeStepIndex === 0) {
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
    } else if (activeStepIndex === 2) {
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
    } else if (activeStepIndex === 3) {
      handleCompleteCheckout();
    } else {
      history.push(activeStep.nextStepLink);
    }
  };
  const shippingMethods = availableShippingMethods
    ? availableShippingMethods
    : [];
  const paymentGateways = availablePaymentGateways
    ? availablePaymentGateways
    : [];
  const shippingTaxedPrice = shippingPrice && {
    gross: shippingPrice,
    net: shippingPrice,
  };
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };
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

  const step = useCheckoutStepState(items, checkout, payment);

  const checkoutProgress = (
    <CheckoutProgressBar steps={CHECKOUT_STEPS} activeStep={activeStepIndex} />
  );
  const cartSummary = (
    <CartSummary
      shipping={shippingTaxedPrice || undefined}
      subtotal={subtotalPrice || undefined}
      promoCode={promoTaxedPrice || undefined}
      total={totalPrice || undefined}
      products={products}
    />
  );
  const renderAddress = (props: RouteComponentProps<any>) => (
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
  const renderShipping = (props: RouteComponentProps<any>) => (
    <CheckoutShipping
      {...props}
      shippingMethods={shippingMethods}
      selectedShippingMethodId={checkout?.shippingMethod?.id}
      selectShippingMethod={handleSetShippingMethod}
    />
  );
  const renderPayment = (props: RouteComponentProps<any>) => (
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
      selectPaymentGateway={setSelectedPaymentGateway}
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
  const renderReview = (props: RouteComponentProps<any>) => (
    <CheckoutReview
      {...props}
      shippingAddress={checkoutShippingAddress}
      billingAddress={checkoutBillingAddress}
      shippingMethodName={checkout?.shippingMethod?.name}
      paymentMethodName={getPaymentMethodDescription()}
      email={checkout?.email}
    />
  );
  const checkoutView =
    cartLoaded && checkoutLoaded ? (
      <CheckoutRouter
        step={step}
        renderAddress={renderAddress}
        renderShipping={renderShipping}
        renderPayment={renderPayment}
        renderReview={renderReview}
      />
    ) : (
      <Loader />
    );
  const button = activeStep && (
    <Button
      data-cy="checkoutPageBtnNextStep"
      onClick={handleNextStepClick}
      type={
        checkoutAddressFormRef ||
        checkoutBillingFormRef ||
        checkoutGatewayFormRef
          ? "submit"
          : "button"
      }
    >
      {activeStep.nextActionName.toUpperCase()}
    </Button>
  );

  return (
    <Checkout
      navigation={checkoutProgress}
      cartSummary={cartSummary}
      checkout={checkoutView}
      button={button}
    />
  );
};

export { CheckoutPage };
