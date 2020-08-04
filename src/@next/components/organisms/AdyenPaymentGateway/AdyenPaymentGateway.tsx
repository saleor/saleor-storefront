import React, { useEffect, useRef, useState } from "react";

import { IFormError, IPaymentGatewayConfig } from "@types";

export interface IProps {
  /**
   * Payment gateway client configuration.
   */
  config: IPaymentGatewayConfig[];
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLDivElement>;
  /**
   * URL address of payment gateway script file to be used.
   */
  scriptSrc: string;
  /**
   * URL address of CSS file styling payment gateway.
   */
  styleSrc: string;
  /**
   * Method called after the form is submitted. Passed token attribute will be used to create payment.
   */
  processPayment: () => void;
  /**
   * Method called when gateway error occured.
   */
  onError: (errors: IFormError[]) => void;
}

const AdyenPaymentGateway: React.FC<IProps> = ({
  config,
  formRef,
  scriptSrc,
  styleSrc,
  processPayment,
  onError,
}: IProps) => {
  const adyenOriginKey = config?.find(({ field }) => field === "origin_key")
    ?.value;
  const adyenConfig = config?.find(({ field }) => field === "config")?.value;
  const parsedAdyenConfig = adyenConfig && JSON.parse(adyenConfig);

  const [dropin, setDropin] = useState<any>();
  const gatewayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adyenOriginKey && parsedAdyenConfig && !dropin && gatewayRef.current) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = styleSrc;
      document.body.appendChild(link);

      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.onload = initAdyenGatewayHandlers; // Wait until the script is loaded before initiating AdyenCheckout
      document.body.appendChild(script);
    }
  }, [adyenOriginKey, parsedAdyenConfig, gatewayRef.current]);

  const initAdyenGatewayHandlers = () => {
    const configuration = adyenOriginKey &&
      adyenConfig && {
        locale: navigator.language,
        environment: "test",
        originKey: adyenOriginKey,
        paymentMethodsResponse: {
          paymentMethods: parsedAdyenConfig,
        },
        showPayButton: false,
        onError,
      };

    const checkout = configuration && new window.AdyenCheckout(configuration);
    const dropinElement = checkout?.create("dropin");

    if (dropinElement && !dropin && gatewayRef.current) {
      dropinElement?.mount(gatewayRef.current);
      setDropin(dropinElement);
    }
  };

  useEffect(() => {
    (formRef?.current as any)?.addEventListener("submit", () => {
      processPayment();
    });
  }, [formRef]);

  return (
    <div ref={formRef}>
      <div ref={gatewayRef} />
    </div>
  );
};

export { AdyenPaymentGateway };
