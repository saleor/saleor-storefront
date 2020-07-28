import { compact } from "lodash";
import { PaymentGateway } from "@saleor/sdk/lib/fragments/gqlTypes/PaymentGateway";
import { PROVIDERS } from "@temp/core/config";
import { useEffect, useState } from "react";
import { IPaymentGatewayHandlers } from "../types";

export const usePaymentGatewaysHandlers = ({
  gatewayRef,
  availablePaymentGateways,
  onSubmitPayment,
}: {
  gatewayRef: any;
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

  const [dropin, setDropin] = useState<any>();

  // useEffect(() => {
  //   const gatewayHandlers = paymentGatewaysHandlers?.find(
  //     gatewayHandlers => gatewayHandlers.name === PROVIDERS.ADYEN.label
  //   );
  //   const dropinElement = gatewayHandlers?.handlers;
  //   console.log("checkoutPage gatewayHandlers dropinElement", gatewayHandlers);
  //   if (dropinElement && !dropin && gatewayRef.current) {
  //     dropinElement?.mount(gatewayRef.current);
  //     setDropin(dropinElement);
  //   }
  // }, [paymentGatewaysHandlers, gatewayRef.current]);

  useEffect(() => {
    if (
      adyenOriginKey &&
      parsedAdyenConfig &&
      !adyenGatewayHandlers &&
      !dropin &&
      gatewayRef.current
    ) {
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
        // TDOD: use below functions
        onSubmit: (state, dropin) => {
          console.log("dropin onSubmit", state, dropin);
          onSubmitPayment(state?.data).then(value => {
            if (value?.data?.order) {
              console.log("dropin onSubmitPayment", value, state, dropin);
              // somethong
            } else {
              console.log("dropin onSubmitPayment", value, state, dropin);
              const paymentAction =
                value?.data?.confirmationData &&
                JSON.parse(value?.data?.confirmationData);
              dropin.handleAction(paymentAction);
              // dropin.handleAction({
              //   paymentData:
              //     "Ab02b4c0!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",
              //   paymentMethodType: "scheme",
              //   url: "https://test.adyen.com/hpp/3d/validate.shtml",
              //   data: {
              //     MD:
              //       "SnpmYUFXWlhiaCtSRktidnI5ZnphUT09IeTIk4kkXVyM0Oc1dsW9Oiz9pCnJXYzTK2GFfAsemtZu5nJFYigKUcHwCItev12raTLfChyWWtQKul2tfF0_pu9Gf509yem3zvWfBzEX2u4lGbXk4LMSscUAQW0IBYAwC761adFXhpfahbwz6I5ZZpfVyjivDuR41p4VOyK8zqhnF1i8zyLo2TNAzGkfQdWD9f0LGFIvy752TNwass_Y0c6h4M-kDEzkKDAubqqt2tHh2PgUGci-4nFLxrt6IWHWRt1OkU0t0jeMQ9dL0le0A11Cw8fDsv2d0m8YEDu4Rh1Mk20xD3RMabrQKKkFS7OK2oB4hDCNDTkD_Rck4URyxTb0FGIV5y4",
              //     PaReq:
              //       "eNpVUdtuwjAM/RXGB9RJ2tBSmUgdnTQmcdmA56kqFlSjLaTtuHz9klLG5pf4HOc4zjGudpooXlLaaFI4papKttTLNqN+GEhXDmUgpe9JlwVvfYWL6IOOCr9JV1lZKO4wRyDcoZHrdJcUtcIkPT5PZkpy4XoIHcKc9CRWK6rqRZ5H6bHJNGmEG41FkpNaR5/R+ClcJnsq9ct4PkVoeUzLpqj1RQ34AOEOsNF7tavrQxUCnE4nJ9lcqHDSMgcEW0N4zLRobFaZXudso+bx+jpbfXFz8tn1nU+vkbfcRjZGCPYGbpKalGCCMV/4Pe6GXIaeRGh5THI7hFov455wHWH4jsGDfSi6AeHayl8GjdWaivSiAo+Zr9wR0vlQFmQ1CL85wmPs8as1Nq2NWQPf54HLhjaMx0PrcVuwXTLjjGCctW0sQLBS6LYH3ZZN9m/7Pwf/qs4=",
              //     TermUrl: "http://127.0.0.1:3000/",
              //   },
              //   method: "POST",
              //   type: "redirect",
              // });
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

    console.log("usePaymentGatewaysHandlers dropinElement", dropinElement);
    if (dropinElement && !dropin && gatewayRef.current) {
      dropinElement?.mount(gatewayRef.current);
      setDropin(dropinElement);
    }

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
