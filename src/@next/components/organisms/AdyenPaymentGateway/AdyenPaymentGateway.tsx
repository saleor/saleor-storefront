import React, { useEffect, useRef, useState } from "react";

import { IFormError, IPaymentGatewayConfig } from "@types";
import * as S from "./styles";

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
   * Errors returned by the payment gateway.
   */
  errors?: IFormError[];
  /**
   * Method called after the form is submitted. Passed token attribute will be used to create payment.
   */
  processPayment: (data: any) => void;
  /**
   * Method called when gateway error occured.
   */
  onError: (errors: IFormError[]) => void;
}

const AdyenPaymentGateway: React.FC<IProps> = ({
  config,
  formRef,
  processPayment,
  onError,
}: IProps) => {
  const [dropin, setDropin] = useState<any>();
  const ref = useRef<HTMLDivElement>(null);

  const originKey = config.find(({ field }) => field === "origin_key")?.value;
  const adyenConfig = config.find(({ field }) => field === "config")?.value;
  const parsedAdyenConfig = adyenConfig && JSON.parse(adyenConfig);
  console.log(config, originKey, parsedAdyenConfig);

  useEffect(() => {
    if (originKey && parsedAdyenConfig && !dropin) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.9.5/adyen.css";
      document.body.appendChild(link);

      const script = document.createElement("script");
      script.src =
        "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.9.5/adyen.js";
      script.async = true;
      script.onload = initAdyenCheckout; // Wait until the script is loaded before initiating AdyenCheckout
      document.body.appendChild(script);
    }
  }, [originKey, parsedAdyenConfig]);

  const initAdyenCheckout = () => {
    const configuration = {
      locale: navigator.language,
      environment: "test",
      originKey,
      paymentMethodsResponse: {
        paymentMethods: parsedAdyenConfig,
      },
      showPayButton: false,
      onSubmit: (state, dropin) => {
        // dropin.setStatus("loading");
        console.log("dropin onSubmit");
        console.log(state, dropin);
        // makePaymentCall(state.data).then...

        processPayment(state?.data);
      },
      onAdditionalDetails: (state, dropin) => {
        console.log("dropin onAdditionalDetails");
        // makeDetailsCall(state.data).then...
      },
      onError: error => {
        console.log("dropin onError", error);
        onError([error]);
      },
    };

    // TODO: Remove following comments appropriately.
    // You can add AdyenCheckout to your list of globals and then delete the window reference:
    // const checkout = new AdyenCheckout(configuration);
    const checkout = new window.AdyenCheckout(configuration);
    // If you need to refer to the dropin externaly, you can save this inside a variable:
    // const dropin = checkout.create...
    const dropinElement = checkout.create("dropin");
    dropinElement.mount(ref.current);
    console.log("dropinElement", dropinElement);

    setDropin(dropinElement);
    // ref.current?.onsubmit((_, ev) => dropin.submit());
    // formRef?.current?.submit = dropin.submit;
  };

  // const dropInComponent = useMemo(() => <div ref={ref} />, []);

  useEffect(() => {
    console.log("dropin event listener useEffect", formRef, dropin);
    (formRef?.current as any).addEventListener("submit", () => {
      console.log("dropin event submit", dropin);
      if (dropin) {
        // ref.current.dispatchEvent(new Event("submit", { cancelable: true }));
        console.log("dropin event submit dropin");
        dropin.submit();
      }
    });
  }, [formRef, dropin]);

  return (
    <S.Wrapper>
      <div ref={formRef}>
        <div ref={ref} />
      </div>
    </S.Wrapper>
  );
};

export { AdyenPaymentGateway };
