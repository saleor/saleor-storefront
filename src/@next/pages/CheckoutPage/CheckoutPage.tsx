import React, { useContext, useRef } from "react";
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
    availableShippingMethods,
    availablePaymentGateways,
  } = useCheckout();
  const { countries } = useContext(ShopContext);

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
  const checkoutAddressFormRef = useRef(null);
  const checkoutBillingFormId = "billing-form";
  const checkoutBillingFormRef = useRef(null);

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

    if (!userAddressId) {
      history.push(activeStep.nextStepLink);
    }
  };
  const handleSetBillingAddress = (address: IAddress, id?: string) =>
    setBillingAddress({
      ...address,
      id,
    });
  const handleNextStepClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (activeStepIndex === 0) {
      if (user && selectedShippingAddressId) {
        history.push(activeStep.nextStepLink);
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
        render={props => (
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
        render={props => (
          <CheckoutShipping {...props} shippingMethods={shippingMethods} />
        )}
      />
      <Route
        path={steps[2].link}
        render={props => (
          <CheckoutPayment
            {...props}
            formId={checkoutBillingFormId}
            formRef={checkoutBillingFormRef}
            userAddresses={user?.addresses}
            selectedUserAddressId={selectedShippingAddressId}
            checkoutBillingAddress={checkoutBillingAddress}
            countries={countries}
            paymentGateways={paymentGateways}
            setBillingAddress={handleSetBillingAddress}
            billingAsShippingAddress={billingAsShipping}
            setBillingAsShippingAddress={setBillingAsShippingAddress}
          />
        )}
      />
      <Route
        path={steps[3].link}
        render={props => (
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
      type={checkoutAddressFormId ? "submit" : "button"}
      form={checkoutAddressFormId}
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
