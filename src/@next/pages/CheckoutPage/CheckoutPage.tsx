import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { Redirect, useLocation, useHistory } from "react-router-dom";

import { Button, Loader } from "@components/atoms";
import { CheckoutProgressBar } from "@components/molecules";
import { CartSummary, PaymentGatewaysList } from "@components/organisms";
import { Checkout } from "@components/templates";
import { useCart, useCheckout } from "@saleor/sdk";
import { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { checkoutMessages } from "@temp/intl";
import { ITaxedMoney, ICheckoutStep, ICardData, IFormError } from "@types";

import { CheckoutRouter } from "./CheckoutRouter";
import {
  CheckoutAddressSubpage,
  CheckoutPaymentSubpage,
  CheckoutReviewSubpage,
  CheckoutShippingSubpage,
  ICheckoutAddressSubpageHandles,
  ICheckoutPaymentSubpageHandles,
  ICheckoutReviewSubpageHandles,
  ICheckoutShippingSubpageHandles,
} from "./subpages";
import { IProps } from "./types";

const prepareCartSummary = (
  totalPrice?: ITaxedMoney | null,
  subtotalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  promoTaxedPrice?: ITaxedMoney | null,
  items?: IItems
) => {
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

  return (
    <CartSummary
      shipping={shippingTaxedPrice}
      subtotal={subtotalPrice}
      promoCode={promoTaxedPrice}
      total={totalPrice}
      products={products}
    />
  );
};

const getCheckoutProgress = (
  loaded: boolean,
  activeStepIndex: number,
  steps: ICheckoutStep[]
) => {
  return loaded ? (
    <CheckoutProgressBar steps={steps} activeStep={activeStepIndex} />
  ) : null;
};

const getButton = (text: string, onClick: () => void) => {
  if (text) {
    return (
      <Button
        testingContext="checkoutPageNextStepButton"
        onClick={onClick}
        type="submit"
      >
        {text}
      </Button>
    );
  }
  return null;
};

const CheckoutPage: React.FC<IProps> = ({}: IProps) => {
  const { pathname } = useLocation();
  const history = useHistory();
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
    payment,
    availablePaymentGateways,
    createPayment,
  } = useCheckout();
  const intl = useIntl();

  if (cartLoaded && (!items || !items?.length)) {
    return <Redirect to="/cart/" />;
  }

  const [submitInProgress, setSubmitInProgress] = useState(false);

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<
    string | undefined
  >(payment?.gateway);
  const [
    selectedPaymentGatewayToken,
    setSelectedPaymentGatewayToken,
  ] = useState<string | undefined>(payment?.token);
  const [paymentGatewayErrors, setPaymentGatewayErrors] = useState<
    IFormError[]
  >([]);

  useEffect(() => {
    setSelectedPaymentGateway(payment?.gateway);
  }, [payment?.gateway]);
  useEffect(() => {
    setSelectedPaymentGatewayToken(payment?.token);
  }, [payment?.token]);

  const isShippingRequiredForProducts =
    items &&
    items.some(
      ({ variant }) => variant.product?.productType.isShippingRequired
    );

  const steps = isShippingRequiredForProducts
    ? CHECKOUT_STEPS
    : CHECKOUT_STEPS.filter(
        ({ onlyIfShippingRequired }) => !onlyIfShippingRequired
      );
  const matchingStepIndex = steps.findIndex(({ link }) => link === pathname);
  const activeStepIndex =
    matchingStepIndex !== -1 ? matchingStepIndex : steps.length - 1;
  const activeStep = steps[activeStepIndex];

  const checkoutAddressSubpageRef = useRef<ICheckoutAddressSubpageHandles>(
    null
  );
  const checkoutShippingSubpageRef = useRef<ICheckoutShippingSubpageHandles>(
    null
  );
  const checkoutPaymentSubpageRef = useRef<ICheckoutPaymentSubpageHandles>(
    null
  );
  const checkoutReviewSubpageRef = useRef<ICheckoutReviewSubpageHandles>(null);
  const checkoutGatewayFormId = "gateway-form";
  const checkoutGatewayFormRef = useRef<HTMLFormElement>(null);

  const handleNextStepClick = () => {
    // Some magic above and below ensures that the activeStepIndex will always
    // be in 0-3 range
    /* eslint-disable default-case */
    switch (activeStep.index) {
      case 0:
        if (checkoutAddressSubpageRef.current?.submitAddress) {
          checkoutAddressSubpageRef.current?.submitAddress();
        }
        break;
      case 1:
        if (checkoutShippingSubpageRef.current?.submitShipping) {
          checkoutShippingSubpageRef.current?.submitShipping();
        }
        break;
      case 2:
        if (checkoutPaymentSubpageRef.current?.submitPayment) {
          checkoutPaymentSubpageRef.current?.submitPayment();
        }
        break;
      case 3:
        if (checkoutReviewSubpageRef.current?.complete) {
          checkoutReviewSubpageRef.current?.complete();
        }
        break;
    }
  };
  const handleStepSubmitSuccess = (data?: object) => {
    if (activeStepIndex === steps.length - 1) {
      history.push({
        pathname: "/order-finalized",
        state: data,
      });
    } else {
      history.push(steps[activeStepIndex + 1].link);
    }
  };

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  const checkoutView =
    cartLoaded && checkoutLoaded ? (
      <CheckoutRouter
        items={items}
        checkout={checkout}
        payment={payment}
        renderAddress={props => (
          <CheckoutAddressSubpage
            ref={checkoutAddressSubpageRef}
            changeSubmitProgress={setSubmitInProgress}
            onSubmitSuccess={handleStepSubmitSuccess}
            {...props}
          />
        )}
        renderShipping={props => (
          <CheckoutShippingSubpage
            ref={checkoutShippingSubpageRef}
            changeSubmitProgress={setSubmitInProgress}
            onSubmitSuccess={handleStepSubmitSuccess}
            {...props}
          />
        )}
        renderPayment={props => (
          <CheckoutPaymentSubpage
            ref={checkoutPaymentSubpageRef}
            paymentGatewayFormRef={checkoutGatewayFormRef}
            changeSubmitProgress={setSubmitInProgress}
            onSubmitSuccess={handleStepSubmitSuccess}
            onPaymentGatewayError={setPaymentGatewayErrors}
            {...props}
          />
        )}
        renderReview={props => (
          <CheckoutReviewSubpage
            ref={checkoutReviewSubpageRef}
            selectedPaymentGatewayToken={selectedPaymentGatewayToken}
            changeSubmitProgress={setSubmitInProgress}
            onSubmitSuccess={handleStepSubmitSuccess}
            {...props}
          />
        )}
      />
    ) : (
      <Loader />
    );

  const handleProcessPayment = async (
    gateway: string,
    token: string,
    cardData?: ICardData
  ) => {
    const { dataError } = await createPayment(gateway, token, cardData);
    const errors = dataError?.error;
    setSubmitInProgress(false);
    if (errors) {
      setPaymentGatewayErrors(errors);
    } else {
      setPaymentGatewayErrors([]);
      handleStepSubmitSuccess();
    }
  };
  const handlePaymentGatewayError = () => {
    setSubmitInProgress(false);
  };

  const paymentGatewaysView = availablePaymentGateways && (
    <PaymentGatewaysList
      paymentGateways={availablePaymentGateways}
      processPayment={handleProcessPayment}
      formId={checkoutGatewayFormId}
      formRef={checkoutGatewayFormRef}
      selectedPaymentGateway={selectedPaymentGateway}
      selectedPaymentGatewayToken={selectedPaymentGatewayToken}
      selectPaymentGateway={setSelectedPaymentGateway}
      onError={handlePaymentGatewayError}
      errors={paymentGatewayErrors}
    />
  );

  let buttonText = activeStep.nextActionName;
  /* eslint-disable default-case */
  switch (activeStep.nextActionName) {
    case "Continue to Shipping":
      buttonText = intl.formatMessage(checkoutMessages.addressNextActionName);
      break;
    case "Continue to Payment":
      buttonText = intl.formatMessage(checkoutMessages.shippingNextActionName);
      break;
    case "Continue to Review":
      buttonText = intl.formatMessage(checkoutMessages.paymentNextActionName);
      break;
    case "Place order":
      buttonText = intl.formatMessage(checkoutMessages.reviewNextActionName);
      break;
  }

  return (
    <Checkout
      loading={submitInProgress}
      navigation={getCheckoutProgress(
        cartLoaded && checkoutLoaded,
        activeStepIndex,
        steps
      )}
      cartSummary={prepareCartSummary(
        totalPrice,
        subtotalPrice,
        shippingTaxedPrice,
        promoTaxedPrice,
        items
      )}
      checkout={checkoutView}
      paymentGateways={paymentGatewaysView}
      hidePaymentGateways={steps[activeStepIndex].name !== "Payment"}
      button={getButton(buttonText.toUpperCase(), handleNextStepClick)}
    />
  );
};

export { CheckoutPage };
