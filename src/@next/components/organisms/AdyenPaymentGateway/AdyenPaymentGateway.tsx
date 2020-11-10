import React, { useEffect, useRef, useState } from "react";
import { defineMessages, IntlShape, useIntl } from "react-intl";

import {
  IFormError,
  IPaymentGatewayConfig,
  IPaymentGatewayPaymentDetails,
} from "@types";
import { CompleteCheckout_checkoutComplete_order } from "@saleor/sdk/lib/mutations/gqlTypes/CompleteCheckout";
import { ErrorMessage } from "@components/atoms";

export const adyenNotNegativeConfirmationStatusCodes = [
  "Authorised",
  "AuthenticationFinished",
  "AuthenticationNotRequired",
  "Pending",
  "Received",
  "PresentToShopper",
];

const messageDescription = "Adyen payment gateway error";

export const adyenErrorMessages = defineMessages({
  unknownPayment: {
    defaultMessage: "Unknown payment submission error occured.",
    description: messageDescription,
  },
  invalidPaymentSubmission: {
    defaultMessage: "Invalid payment submission.",
    description: messageDescription,
  },
  cannotHandlePaymentConfirmation: {
    defaultMessage:
      "Payment gateway did not provide payment confirmation handler.",
    description: messageDescription,
  },
  paymentMalformedConfirmationData: {
    defaultMessage:
      "Payment needs confirmation but data required for confirmation received from the server is malformed.",
    description: messageDescription,
  },
  paymentNoConfirmationData: {
    defaultMessage:
      "Payment needs confirmation but data required for confirmation not received from the server.",
    description: messageDescription,
  },
});

export const adyenConfirmationErrorMessages = defineMessages({
  error: {
    defaultMessage: "Error processing payment occured.",
    description: messageDescription,
  },
  refused: {
    defaultMessage:
      "The payment was refused. Try the payment again using a different payment method or card.",
    description: messageDescription,
  },
  cancelled: {
    defaultMessage: "Payment was cancelled.",
    description: messageDescription,
  },
  general: {
    defaultMessage: "Payment confirmation went wrong.",
    description: messageDescription,
  },
});

export function translateAdyenConfirmationError(
  status: string,
  intl: IntlShape
): string {
  switch (status) {
    case "Error":
      return intl.formatMessage(adyenConfirmationErrorMessages.error);
    case "Refused":
      return intl.formatMessage(adyenConfirmationErrorMessages.refused);
    case "Cancelled":
      return intl.formatMessage(adyenConfirmationErrorMessages.cancelled);
    default:
      return intl.formatMessage(adyenConfirmationErrorMessages.general);
  }
}

interface IResourceConfig {
  src: string;
  integrity: string;
  crossOrigin: string;
}

interface AdyenSubmitState {
  data?: any;
  isValid?: boolean;
}
interface AdyenError {
  error?: string;
}

export interface IProps {
  /**
   * Payment gateway client configuration.
   */
  config: IPaymentGatewayConfig[];
  /**
   * Payment details.
   */
  paymentDetails: IPaymentGatewayPaymentDetails;
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Payment gateway script resource configuration.
   */
  scriptConfig: IResourceConfig;
  /**
   * Payment gateway CSS styling resource configuration.
   */
  styleConfig: IResourceConfig;
  /**
   * Method called after the form is submitted.
   */
  processPayment: () => void;
  /**
   * Method called to initialize payment submission.
   */
  initializePayment: (data: any) => Promise<any>;
  /**
   * Method to call on gateway payment submission.
   */
  submitPayment: (data: {
    confirmationData: any;
    confirmationNeeded: boolean;
  }) => Promise<any>;
  /**
   * Method called after succesful gateway payment submission. This is the case when no confirmation is needed.
   */
  submitPaymentSuccess: (
    order?: CompleteCheckout_checkoutComplete_order
  ) => void;
  /**
   * Errors returned by the payment gateway.
   */
  errors?: IFormError[];
  /**
   * Method called when gateway error occured.
   */
  onError: (errors: IFormError[]) => void;
}

const AdyenPaymentGateway: React.FC<IProps> = ({
  config,
  paymentDetails,
  formRef,
  scriptConfig,
  styleConfig,
  processPayment,
  initializePayment,
  submitPayment,
  submitPaymentSuccess,
  errors,
  onError,
}: IProps) => {
  const intl = useIntl();

  const adyenClientKey = config?.find(({ field }) => field === "client_key")
    ?.value;
  const adyenConfig = config?.find(({ field }) => field === "config")?.value;
  const parsedAdyenConfig = adyenConfig && JSON.parse(adyenConfig);

  const [dropin, setDropin] = useState<any>();
  const gatewayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.AdyenCheckout) {
      initAdyenGatewayHandlers();
    }
  }, [
    paymentDetails.amount,
    paymentDetails.countryCode,
    paymentDetails.currencyCode,
  ]);

  useEffect(() => {
    if (adyenClientKey && parsedAdyenConfig && !dropin && gatewayRef.current) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = styleConfig.src;
      link.integrity = styleConfig.integrity;
      link.crossOrigin = styleConfig.crossOrigin;
      document.body.appendChild(link);

      const script = document.createElement("script");
      script.src = scriptConfig.src;
      script.integrity = scriptConfig.integrity;
      script.crossOrigin = scriptConfig.crossOrigin;
      script.async = true;
      script.onload = initAdyenGatewayHandlers; // Wait until the script is loaded before initiating AdyenCheckout
      document.body.appendChild(script);
    }
  }, [adyenClientKey, parsedAdyenConfig, gatewayRef.current]);

  const initAdyenGatewayHandlers = () => {
    console.log("paymentDetails init: ", paymentDetails);
    const configuration = adyenClientKey &&
      adyenConfig && {
        locale: navigator.language,
        environment: "test",
        clientKey: adyenClientKey,
        paymentMethodsResponse: parsedAdyenConfig,
        showPayButton: false,
        onSubmit: onSubmitAdyenForm,
        onAdditionalDetails: onSubmitAdyenForm,
        onError: onAdyenError,
        paymentMethodsConfiguration: {
          applepay: {
            onChange: onSubmitAdyenForm,
            onSubmit: onSubmitAdyenForm,
            amount: Math.floor((paymentDetails.amount || 0) * 100),
            currencyCode: paymentDetails.currencyCode,
            countryCode: paymentDetails.countryCode,
            configuration: {
              merchantName: "Saleor Test merchant",
              merchantIdentifier: "merchant.com.adyen.SaleorECOM.test",
            },
            onValidateMerchant: onValidateMerchantWithApple,
          },
        },
      };

    const checkout = configuration && new window.AdyenCheckout(configuration);
    const dropinElement = checkout?.create("dropin");

    if (dropinElement && !dropin && gatewayRef.current) {
      dropinElement?.mount(gatewayRef.current);
      setDropin(dropinElement);
    }
  };

  const onValidateMerchantWithApple = async (
    resolve,
    reject,
    validationURL
  ) => {
    console.log("onValidateMerchant");
    console.log(`onValidateMerchant validationURL: ${validationURL}`);

    const paymentInitialization = await initializePayment(
      JSON.stringify({
        merchantIdentifier: "merchant.com.adyen.SaleorECOM.test",
        displayName: "Merchant ID for Saleor and Adyen",
        domain: "f31c4e742d1e.ngrok.io", // "3b39d6f946ea.ngrok.io",
        validationUrl:
          "https://apple-pay-gateway.apple.com/paymentservices/startSession",
        paymentMethod: "applepay",
      })
    );

    if (paymentInitialization.errors?.length) {
      onError(paymentInitialization.errors);
      reject();
    }

    console.log(paymentInitialization.data);
    resolve(JSON.parse(paymentInitialization.data));
  };

  const onSubmitAdyenForm = async (state?: AdyenSubmitState) => {
    console.log("onSubmitAdyenForm: ", state);

    if (!state?.isValid) {
      onError([
        new Error(
          intl.formatMessage(adyenErrorMessages.invalidPaymentSubmission)
        ),
      ]);
    } else {
      const paymentMethodType = state?.data?.paymentMethod?.type;
      const payment = await submitPayment(state?.data);

      if (payment.errors?.length) {
        onError(payment.errors);
      } else if (!payment?.confirmationNeeded) {
        submitPaymentSuccess(payment?.order);
      } else if (!dropin?.handleAction && paymentMethodType !== "applepay") {
        onError([
          new Error(
            intl.formatMessage(
              adyenErrorMessages.cannotHandlePaymentConfirmation
            )
          ),
        ]);
      } else if (!payment?.confirmationData) {
        onError([
          new Error(
            intl.formatMessage(adyenErrorMessages.paymentNoConfirmationData)
          ),
        ]);
      } else if (paymentMethodType !== "applepay") {
        let paymentAction;
        try {
          paymentAction = JSON.parse(payment.confirmationData);
        } catch (parseError) {
          onError([
            new Error(
              intl.formatMessage(
                adyenErrorMessages.paymentMalformedConfirmationData
              )
            ),
          ]);
        }
        try {
          dropin.handleAction(paymentAction);
        } catch (error) {
          onError([new Error(error)]);
        }
      }
    }
  };

  const onAdyenError = (error?: AdyenError) => {
    if (error?.error) {
      onError([{ message: error.error }]);
    } else {
      onError([
        new Error(intl.formatMessage(adyenErrorMessages.unknownPayment)),
      ]);
    }
  };

  useEffect(() => {
    if (dropin) {
      (formRef?.current as any)?.addEventListener("submitComplete", () => {
        dropin.submit();
      });
    }
  }, [formRef, dropin]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    processPayment();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div ref={gatewayRef} />
      <ErrorMessage errors={errors} />
    </form>
  );
};

export { AdyenPaymentGateway };
