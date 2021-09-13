import { CompleteCheckout_checkoutComplete_order } from "@saleor/sdk/lib/mutations/gqlTypes/CompleteCheckout";
import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";

import { ErrorMessage } from "@components/atoms";
import { paymentErrorMessages } from "@temp/intl";
import {
  IFormError,
  IPaymentGatewayConfig,
  IPaymentSubmitResult,
} from "@types";

import { adyenErrorMessages } from "./intl";

export const adyenNotNegativeConfirmationStatusCodes = [
  "Authorised",
  "AuthenticationFinished",
  "AuthenticationNotRequired",
  "Pending",
  "Received",
  "PresentToShopper",
];

interface IResourceConfig {
  src: string;
  integrity: string;
  crossOrigin: string;
}

interface AdyenSubmitState {
  data?: any;
  isValid?: boolean;
}
interface AdyenSubmitDropin {
  handleAction?: (data?: any) => any;
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
   * Method to call on gateway payment submission.
   */
  submitPayment: (data: object) => Promise<IPaymentSubmitResult>;
  /**
   * Method called after succesful gateway payment submission. This is the case when no confirmation is needed.
   */
  submitPaymentSuccess: (
    order?: CompleteCheckout_checkoutComplete_order | null
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
  formRef,
  scriptConfig,
  styleConfig,
  processPayment,
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
      };

    const checkout = configuration && new window.AdyenCheckout(configuration);
    const dropinElement = checkout?.create("dropin");

    if (dropinElement && !dropin && gatewayRef.current) {
      dropinElement?.mount(gatewayRef.current);
      setDropin(dropinElement);
    }
  };

  const onSubmitAdyenForm = async (
    state?: AdyenSubmitState,
    dropin?: AdyenSubmitDropin
  ) => {
    if (!state?.isValid) {
      onError([
        new Error(
          intl.formatMessage(adyenErrorMessages.invalidPaymentSubmission)
        ),
      ]);
    } else {
      const payment = await submitPayment(state?.data);

      if (payment.errors?.length) {
        onError(payment.errors);
      } else if (!payment?.confirmationNeeded) {
        submitPaymentSuccess(payment?.order);
      } else if (!dropin?.handleAction) {
        onError([
          new Error(
            intl.formatMessage(
              paymentErrorMessages.cannotHandlePaymentConfirmation
            )
          ),
        ]);
      } else if (!payment?.confirmationData) {
        onError([
          new Error(
            intl.formatMessage(paymentErrorMessages.paymentNoConfirmationData)
          ),
        ]);
      } else {
        let paymentAction;
        try {
          paymentAction = JSON.parse(payment.confirmationData);
        } catch (parseError) {
          onError([
            new Error(
              intl.formatMessage(
                paymentErrorMessages.paymentMalformedConfirmationData
              )
            ),
          ]);
          return;
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
