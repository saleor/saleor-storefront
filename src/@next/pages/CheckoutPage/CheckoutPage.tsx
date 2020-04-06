import React, { useContext, useEffect, useRef, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import { Button } from "@components/atoms";
import { CheckoutProgressBar } from "@components/molecules";
import {
  CartSummary,
  CheckoutAddress,
  CheckoutPayment,
  CheckoutReview,
  CheckoutShipping,
} from "@components/organisms";
import { Checkout } from "@components/templates";
import { useCart, useCheckout, useUserDetails } from "@sdk/react";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { IAddress } from "@types";

import { IProps } from "./types";

const steps = [
  {
    link: "/new-checkout/address",
    name: "Address",
    nextActionName: "Continue to Shipping",
    nextStepLink: "/new-checkout/shipping",
  },
  {
    link: "/new-checkout/shipping",
    name: "Shipping",
    nextActionName: "Continue to Payment",
    nextStepLink: "/new-checkout/payment",
  },
  {
    link: "/new-checkout/payment",
    name: "Payment",
    nextActionName: "Continue to Review",
    nextStepLink: "/new-checkout/review",
  },
  {
    link: "/new-checkout/review",
    name: "Review",
    nextActionName: "Finalize order",
    nextStepLink: "/new-order-finalized",
  },
];

const CheckoutPage: React.FC<IProps> = ({}: IProps) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { data: user } = useUserDetails();
  const { shippingPrice, subtotalPrice, totalPrice, items } = useCart();
  const {
    checkout,
    billingAsShipping,
    setShippingAddress,
    setBillingAddress,
    setBillingAsShippingAddress,
    selectedShippingAddressId,
    selectedBillingAddressId,
    availableShippingMethods,
    availablePaymentGateways,
    payment,
    createPayment,
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

  const activeStepIndex = steps.findIndex(({ link }) => link === pathname);
  const activeStep = steps[activeStepIndex];
  const products = items?.map(({ variant, totalPrice, quantity }) => ({
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
  const handleSetShippingAddress = (
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

    setShippingAddress(
      {
        ...address,
        id: userAddressId,
      },
      shippingEmail
    );

    history.push(activeStep.nextStepLink);
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
  const handleProcessPayment = (gateway: string, token: string) => {
    createPayment(gateway, token);
    history.push(activeStep.nextStepLink);
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
      if (user && selectedBillingAddressId) {
        checkoutBillingFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        // TODO validate form
        checkoutBillingFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      }
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

  const checkoutProgress = (
    <CheckoutProgressBar steps={steps} activeStep={activeStepIndex} />
  );
  const cartSummary = (
    <CartSummary
      shipping={shippingPrice || undefined}
      subtotal={subtotalPrice || undefined}
      total={totalPrice || undefined}
      products={products}
    />
  );
  const checkoutView = (
    <Switch>
      <Route
        path={steps[0].link}
        render={(props) => (
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
        )}
      />
      <Route
        path={steps[1].link}
        render={(props) => (
          <CheckoutShipping {...props} shippingMethods={shippingMethods} />
        )}
      />
      <Route
        path={steps[2].link}
        render={(props) => (
          <CheckoutPayment
            {...props}
            formId={checkoutBillingFormId}
            formRef={checkoutBillingFormRef}
            userAddresses={user?.addresses}
            selectedUserAddressId={selectedShippingAddressId}
            checkoutBillingAddress={checkoutBillingAddress}
            countries={countries}
            paymentGateways={paymentGateways}
            selectedPaymentGateway={selectedPaymentGateway}
            selectedPaymentGatewayToken={selectedPaymentGatewayToken}
            selectPaymentGateway={setSelectedPaymentGateway}
            setBillingAddress={handleSetBillingAddress}
            billingAsShippingAddress={billingAsShipping}
            setBillingAsShippingAddress={setBillingAsShippingAddress}
            gatewayFormRef={checkoutGatewayFormRef}
            processPayment={handleProcessPayment}
          />
        )}
      />
      <Route
        path={steps[3].link}
        render={(props) => (
          <CheckoutReview
            {...props}
            shippingAddress={checkoutShippingAddress}
            billingAddress={checkoutBillingAddress}
            email={checkout?.email}
          />
        )}
      />
    </Switch>
  );
  const button = (
    <Button
      onClick={handleNextStepClick}
      type={
        checkoutAddressFormId || checkoutBillingFormId || checkoutGatewayFormId
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
