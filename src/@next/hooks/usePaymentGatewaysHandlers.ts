import { compact } from "lodash";
import { PaymentGateway } from "@saleor/sdk/lib/fragments/gqlTypes/PaymentGateway";
import { PROVIDERS } from "@temp/core/config";
import { useEffect, useState } from "react";
import { IPaymentGatewayHandlers } from "../types";

export const usePaymentGatewaysHandlers = ({
  availablePaymentGateways,
  onSubmitPayment,
}: {
  availablePaymentGateways: PaymentGateway[] | undefined;
  onSubmitPayment: (state: any) => void;
}): IPaymentGatewayHandlers[] => {
  const [
    adyenGatewayHandlers,
    setAdyenGatewayHandlers,
  ] = useState<IPaymentGatewayHandlers | null>();

  const adyen = availablePaymentGateways?.find(
    ({ name }) => name === PROVIDERS.ADYEN.label
  );
  const adyenOriginKey = adyen?.config?.find(
    ({ field }) => field === "origin_key"
  )?.value;
  const adyenConfig = adyen?.config?.find(({ field }) => field === "config")
    ?.value;
  const parsedAdyenConfig = adyenConfig && JSON.parse(adyenConfig);
  console.log(adyenConfig, adyenOriginKey, parsedAdyenConfig);

  useEffect(() => {
    if (adyenOriginKey && parsedAdyenConfig && !adyenGatewayHandlers) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.9.5/adyen.css";
      document.body.appendChild(link);

      const script = document.createElement("script");
      script.src =
        "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.9.5/adyen.js";
      script.async = true;
      script.onload = initAdyenGatewayHandlers; // Wait until the script is loaded before initiating AdyenCheckout
      document.body.appendChild(script);
    }
  }, [adyenOriginKey, parsedAdyenConfig]);

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
        // TDOD: use below functions
        onSubmit: (state, dropin) => {
          console.log("dropin onSubmit", state, dropin);
          onSubmitPayment(state?.data).then(value => {
            if (value.data) {
              console.log("dropin onSubmitPayment", value, state, dropin);
              // somethong
            } else {
              console.log("dropin onSubmitPayment", value, state, dropin);
              dropin.handleAction(value.action);
            }
          });
        },
        onAdditionalDetails: (state, dropin) => {
          console.log("dropin onAdditionalDetails", state, dropin);
        },
        onError: error => {
          console.log("dropin onError", error);
        },
      };

    // TODO: Remove following comments appropriately.
    // You can add AdyenCheckout to your list of globals and then delete the window reference:
    // const checkout = new AdyenCheckout(configuration);
    const checkout = configuration && new window.AdyenCheckout(configuration);
    // If you need to refer to the dropin externaly, you can save this inside a variable:
    // const dropin = checkout.create...
    const dropinElement = checkout?.create("dropin");

    const adyenHandlers: IPaymentGatewayHandlers | null = configuration
      ? {
          name: PROVIDERS.ADYEN.label,
          handlers: dropinElement,
          config: configuration,
        }
      : null;

    setAdyenGatewayHandlers(adyenHandlers);
  };

  return compact([adyenGatewayHandlers]);
};
