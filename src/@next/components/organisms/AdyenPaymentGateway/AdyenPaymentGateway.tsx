import React, { useEffect, useRef, useState } from "react";

import { IFormError, IPaymentGatewayConfig } from "@types";
import { CompleteCheckout_checkoutComplete_order } from "@saleor/sdk/lib/mutations/gqlTypes/CompleteCheckout";

interface IResourceConfig {
  src: string;
  integrity: string;
  crossOrigin: string;
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
  onError,
}: IProps) => {
  const adyenClientKey = config?.find(({ field }) => field === "client_key")
    ?.value;
  const adyenConfig = config?.find(({ field }) => field === "config")?.value;
  const parsedAdyenConfig = adyenConfig && JSON.parse(adyenConfig);

  const [dropin, setDropin] = useState<any>();
  const gatewayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(
      "adyen state effect update",
      adyenClientKey,
      parsedAdyenConfig,
      dropin,
      gatewayRef.current
    );
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
        onSubmit: (state: any, dropin: any) => {
          console.log("submit adyen", state, dropin);
          submitPayment(state?.data).then(value => {
            if (value.error) {
              onError([value.error]);
            } else if (!value?.confirmationNeeded) {
              console.log(
                "dropin onSubmitPayment no confirmation",
                value,
                state,
                dropin
              );
              submitPaymentSuccess(value?.order);
            } else {
              console.log(
                "dropin onSubmitPayment confirmation needed",
                value,
                state,
                dropin
              );
              const paymentAction =
                value?.confirmationData && JSON.parse(value?.confirmationData);
              dropin.handleAction(paymentAction);
            }
          });
        },
        onAdditionalDetails: (state: any, dropin: any) => {
          console.log("additional details adyen", state, dropin);
          submitPayment(state?.data).then(value => {
            if (value.error) {
              onError([value.error]);
            } else if (!value?.confirmationNeeded) {
              console.log(
                "dropin additionalDetails onSubmitPayment no confirmation",
                value,
                state,
                dropin
              );
              submitPaymentSuccess(value?.order);
            } else {
              console.log(
                "dropin additionalDetails onSubmitPayment confirmation needed",
                value,
                state,
                dropin
              );
              const paymentAction =
                value?.confirmationData && JSON.parse(value?.confirmationData);
              dropin.handleAction(paymentAction);
            }
          });
        },
        onError: (error: any) => {
          onError([{ message: error.error }]);
        },
      };

    const checkout = configuration && new window.AdyenCheckout(configuration);
    const dropinElement = checkout?.create("dropin");

    if (dropinElement && !dropin && gatewayRef.current) {
      dropinElement?.mount(gatewayRef.current);
      setDropin(dropinElement);
      console.log(dropinElement, "dropin element set");
    }
  };

  useEffect(() => {
    (formRef?.current as any)?.addEventListener("submit", () => {
      processPayment();
    });
  }, [formRef]);

  useEffect(() => {
    if (dropin) {
      (formRef?.current as any)?.addEventListener("submitComplete", () => {
        console.log("event submitComplete");
        dropin.submit();
      });
    }
  }, [formRef, dropin]);

  return (
    <form ref={formRef}>
      <div ref={gatewayRef} />
    </form>
  );
};

export { AdyenPaymentGateway };
