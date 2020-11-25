import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Loader, Redirect } from "@components/atoms";
import {
  PaymentGatewaysList,
  translateAdyenConfirmationError,
  adyenNotNegativeConfirmationStatusCodes,
} from "@components/organisms";
import { Checkout } from "@components/templates";
import { useCart, useCheckout } from "@saleor/sdk";
import { CHECKOUT_STEPS, CheckoutStep } from "@temp/core/config";

import { ICardData, IFormError } from "@types";
import { CompleteCheckout_checkoutComplete_order } from "@saleor/sdk/lib/mutations/gqlTypes/CompleteCheckout";
import { cartUrl, checkoutUrl, orderFinalizedUrl } from "@temp/app/routes";

import {
  getCheckoutProgress,
  getStepButton,
  getStepLink,
  isStepCorrect,
  prepareCartSummary,
} from "@app/pages/CheckoutPage/utils";
import { useCheckoutStepFromPath, useCheckoutStepState } from "@hooks";
import { checkIfShippingRequiredForProducts } from "@utils/core";
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

// FIXME:
// Does nextjs have history state?
const CheckoutPage: NextPage = () => {
  // const location = useLocation();
  // const history = useHistory();
  const { asPath, pathname, push, query: querystring } = useRouter();
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
    completeCheckout,
  } = useCheckout();
  const intl = useIntl();
  const { recommendedStep, maxPossibleStep } = useCheckoutStepState(
    items,
    checkout,
    payment,
    totalPrice
  );
  const stepFromPath = useCheckoutStepFromPath(pathname);
  const isShippingRequiredForProducts = checkIfShippingRequiredForProducts(
    items
  );

  if (cartLoaded && (!items || !items?.length)) {
    return <Redirect url={cartUrl} />;
  }

  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [paymentConfirmation, setPaymentConfirmation] = useState(false);

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

  const stepsWithViews = CHECKOUT_STEPS.filter(
    ({ withoutOwnView }) => !withoutOwnView
  );
  const steps = isShippingRequiredForProducts
    ? stepsWithViews
    : stepsWithViews.filter(
        ({ onlyIfShippingRequired }) => !onlyIfShippingRequired
      );
  const getActiveStepIndex = () => {
    const matchingStepIndex = steps.findIndex(({ link }) => link === pathname);
    return matchingStepIndex !== -1 ? matchingStepIndex : steps.length - 1;
  };
  const getActiveStep = () => steps[getActiveStepIndex()];

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
    switch (getActiveStep().index) {
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
  const handleStepSubmitSuccess = (
    currentStep: CheckoutStep,
    data?: object
  ) => {
    const activeStepIndex = getActiveStepIndex();
    if (currentStep === CheckoutStep.Review) {
      // TODO: How to handle push state?
      push({
        pathname: orderFinalizedUrl,
        // state: data,
      });
    } else {
      push(steps[activeStepIndex + 1].link);
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
        totalPrice={totalPrice}
        renderAddress={props => (
          <CheckoutAddressSubpage
            ref={checkoutAddressSubpageRef}
            changeSubmitProgress={setSubmitInProgress}
            onSubmitSuccess={() =>
              handleStepSubmitSuccess(CheckoutStep.Address)
            }
            {...props}
          />
        )}
        renderShipping={props => (
          <CheckoutShippingSubpage
            ref={checkoutShippingSubpageRef}
            changeSubmitProgress={setSubmitInProgress}
            onSubmitSuccess={() =>
              handleStepSubmitSuccess(CheckoutStep.Shipping)
            }
            {...props}
          />
        )}
        renderPayment={props => (
          <CheckoutPaymentSubpage
            ref={checkoutPaymentSubpageRef}
            paymentGatewayFormRef={checkoutGatewayFormRef}
            changeSubmitProgress={setSubmitInProgress}
            onSubmitSuccess={() =>
              handleStepSubmitSuccess(CheckoutStep.Payment)
            }
            onPaymentGatewayError={setPaymentGatewayErrors}
            {...props}
          />
        )}
        renderReview={props => (
          <CheckoutReviewSubpage
            ref={checkoutReviewSubpageRef}
            paymentGatewayFormRef={checkoutGatewayFormRef}
            selectedPaymentGatewayToken={selectedPaymentGatewayToken}
            changeSubmitProgress={setSubmitInProgress}
            onSubmitSuccess={data =>
              handleStepSubmitSuccess(CheckoutStep.Review, data)
            }
            {...props}
          />
        )}
      />
    ) : (
      <Loader />
    );

  const handleProcessPayment = async (
    gateway: string,
    token?: string,
    cardData?: ICardData
  ) => {
    const paymentConfirmStepLink = CHECKOUT_STEPS.find(
      step => step.step === CheckoutStep.PaymentConfirm
    )?.link;
    const { dataError } = await createPayment({
      gateway,
      token,
      creditCard: cardData,
      returnUrl: `${window.location.origin}${paymentConfirmStepLink}`,
    });
    const errors = dataError?.error;
    setSubmitInProgress(false);
    if (errors) {
      setPaymentGatewayErrors(errors);
    } else {
      setPaymentGatewayErrors([]);
      handleStepSubmitSuccess(CheckoutStep.Payment);
    }
  };
  const handleSubmitPayment = async (paymentData?: object) => {
    const response = await completeCheckout({ paymentData });
    return {
      confirmationData: response.data?.confirmationData,
      confirmationNeeded: response.data?.confirmationNeeded,
      order: response.data?.order,
      errors: response.dataError?.error,
    };
  };
  const handleSubmitPaymentSuccess = (
    order?: CompleteCheckout_checkoutComplete_order
  ) => {
    setSubmitInProgress(false);
    setPaymentGatewayErrors([]);
    handleStepSubmitSuccess(CheckoutStep.Review, {
      id: order?.id,
      orderNumber: order?.number,
      token: order?.token,
    });
  };
  const handlePaymentGatewayError = (errors: IFormError[]) => {
    setSubmitInProgress(false);
    setPaymentGatewayErrors(errors);
    const paymentStepLink = steps.find(
      step => step.step === CheckoutStep.Payment
    )?.link;
    if (paymentStepLink) {
      push(paymentStepLink);
    }
  };

  const paymentGatewaysView = availablePaymentGateways && (
    <PaymentGatewaysList
      paymentGateways={availablePaymentGateways}
      processPayment={handleProcessPayment}
      submitPayment={handleSubmitPayment}
      submitPaymentSuccess={handleSubmitPaymentSuccess}
      formId={checkoutGatewayFormId}
      formRef={checkoutGatewayFormRef}
      selectedPaymentGateway={selectedPaymentGateway}
      selectedPaymentGatewayToken={selectedPaymentGatewayToken}
      selectPaymentGateway={setSelectedPaymentGateway}
      onError={handlePaymentGatewayError}
      errors={paymentGatewayErrors}
    />
  );

  const activeStep = getActiveStep();

  useEffect(() => {
    const paymentConfirmStepLink = CHECKOUT_STEPS.find(
      step => step.step === CheckoutStep.PaymentConfirm
    )?.link;
    if (
      !submitInProgress &&
      checkout &&
      pathname === paymentConfirmStepLink &&
      !paymentConfirmation
    ) {
      handlePaymentConfirm();
    }
  }, [asPath, submitInProgress, checkout]);

  const handlePaymentConfirm = async () => {
    /**
     * Prevent proceeding in confirmation flow in case of gateways that don't support it to prevent unknown bugs.
     */
    if (payment?.gateway !== "mirumee.payments.adyen") {
      const paymentStepLink = steps.find(
        step => step.step === CheckoutStep.Payment
      )?.link;
      if (paymentStepLink) {
        push(paymentStepLink);
      }
    }

    setSubmitInProgress(true);
    setPaymentConfirmation(true);
    /**
     * Saleor API creates an order for not fully authorised payments, thus we accept all non negative payment result codes,
     * assuming the payment is completed, what means we can proceed further.
     * https://docs.adyen.com/checkout/drop-in-web?tab=http_get_1#step-6-present-payment-result
     */
    if (
      adyenNotNegativeConfirmationStatusCodes.includes(
        querystring.resultCode as string
      )
    ) {
      const { data, dataError } = await completeCheckout();
      const errors = dataError?.error;
      setSubmitInProgress(false);
      if (errors) {
        setPaymentGatewayErrors(errors);
        const paymentStepLink = steps.find(
          step => step.step === CheckoutStep.Payment
        )?.link;
        if (paymentStepLink) {
          push(paymentStepLink);
        }
      } else {
        setPaymentGatewayErrors([]);
        handleStepSubmitSuccess(CheckoutStep.Review, {
          id: data?.order?.id,
          orderNumber: data?.order?.number,
          token: data?.order?.token,
        });
      }
    } else {
      setPaymentGatewayErrors([
        {
          message: translateAdyenConfirmationError(
            querystring.resultCode as string,
            intl
          ),
        },
      ]);
      const paymentStepLink = steps.find(
        step => step.step === CheckoutStep.Payment
      )?.link;
      if (paymentStepLink) {
        push(paymentStepLink);
        setSubmitInProgress(false);
        setPaymentConfirmation(false);
      }
    }
  };

  const activeStepIndex = getActiveStepIndex();
  console.log(activeStep, activeStepIndex);

  if (pathname === checkoutUrl) {
    return <Redirect url={getStepLink(recommendedStep)} />;
  }
  if (
    isStepCorrect(
      pathname,
      stepFromPath,
      maxPossibleStep,
      isShippingRequiredForProducts
    )
  ) {
    return <Redirect url={getStepLink()} />;
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
      hidePaymentGateways={steps[activeStepIndex].step !== CheckoutStep.Payment}
      button={getStepButton(
        intl,
        activeStep.nextActionName,
        handleNextStepClick
      )}
    />
  );
};

export { CheckoutPage };
