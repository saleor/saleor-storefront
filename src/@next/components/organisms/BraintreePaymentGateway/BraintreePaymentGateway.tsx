import React, { useEffect } from "react";

import * as S from "./styles";
import { IProps } from "./types";

import { useCart } from "@sdk/react";

import * as dropin from "braintree-web-drop-in";


const BraintreePaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  errors = [],
  postalCode,
  onError,
}: IProps) => {

// get the price and amout from the cart only necessary for paypal
  const cartApi = useCart();
  const amount = cartApi.totalPrice?.net.amount || 0;
  const currency = cartApi.totalPrice?.net.currency || "EUR";

  const clientToken = config.find(({ field }) => field === "client_token")
    ?.value || "";

  useEffect(() => {
    var myContainer = document.getElementById('dropin-ui-button');


    // dropin.create({ authorization: clientToken, container: myContainer }, (error: any, myDropin: { clearSelectedPaymentMethod: () => void; }) => {
    //   if (error) {
    //     return;
    //   }
    //   if (myDropin) {
    //     myDropin.clearSelectedPaymentMethod();
    //   }
    // });

(async () => {
  const myOptions: dropin.Options = {
    authorization: clientToken,
    container: myContainer,
    locale: "en-US",
    translations: {},
    paymentOptionPriority: ["card", "paypal", "paypalCredit", "venmo", "applePay"],
    card: {
      cardholderName: {
        required: false
      },
      overrides: {
        fields: {},
        styles: {}
      },
      clearFieldsAfterTokenization: false,
      vault: {
        allowVaultCardOverride: false,
        vaultCard: false
      }
    },
    paypal: {
      flow: "checkout",
      amount: amount,
      currency: currency,
      commit: false
    },
    paypalCredit: undefined,
    venmo: {
      allowNewBrowserTab: false
    },
    applePay: {
      displayName: "name",
      applePaySessionVersion: 1,
      paymentRequest: {}
    },
    googlePay: {
      merchantId: "",
      googlePayVersion: "",
      transactionInfo: {},
      button: {}
    },
    dataCollector: {
      kount: false,
      paypal: false
    },
    threeDSecure: {
      amount: "1"
    },
    vaultManager: false,
    preselectVaultedPaymentMethod: false
  };


  try {
    const myDropin = await dropin.create(myOptions);

    myDropin.clearSelectedPaymentMethod();


    processPayment("BraintreeTest", {
         brand: "unfinished",
         lastDigits: "66",
       });


  } catch (error){
    const dropinUIError = [
         {
           message: JSON.stringify(error)
         },
       ];
       onError(dropinUIError);
       console.log(error);
  }
    // const myBool: boolean = myDropin.isPaymentMethodRequestable();
    //
    // function onNoPaymentMethodRequestable() {
    //   return;
    // }
    // function onPaymentMethodRequestable({ type, paymentMethodIsSelected }: dropin.PaymentMethodRequestablePayload) {
    //   const myType: "CreditCard" | "PayPalAccount" = type;
    //   const myBool: boolean = paymentMethodIsSelected;
    // }
    // function onPaymentOptionSelected({ paymentOption }: dropin.PaymentOptionSelectedPayload) {
    //   const myPaymentOption: "card" | "paypal" | "paypalCredit" = paymentOption;
    // }
    //
    // myDropin.on("noPaymentMethodRequestable", onNoPaymentMethodRequestable);
    // myDropin.on("paymentMethodRequestable", onPaymentMethodRequestable);
    // myDropin.on("paymentOptionSelected", onPaymentOptionSelected);
    //
    // myDropin.off("noPaymentMethodRequestable", onNoPaymentMethodRequestable);
    // myDropin.off("paymentMethodRequestable", onPaymentMethodRequestable);
    // myDropin.off("paymentOptionSelected", onPaymentOptionSelected);

    // myDropin.requestPaymentMethod((error: any, payload: any) => {
    //   if (error) {
    //     const requestPaymentError = [
    //       {
    //         message: JSON.stringify(error)
    //       },
    //     ];
    //     onError(requestPaymentError);
    //     console.log(error);
    //     return;
    //   }
    // });

    // const myPayload = await myDropin.requestPaymentMethod();
    // const details: object = myPayload.details;
    // const deviceData: string | null = myPayload.deviceData;
    // const nonce: string = myPayload.nonce;
    // const type: "CreditCard" | "PayPalAccount" | "VenmoAccount" | "AndroidPayCard" | "ApplePayCard" = myPayload.type;
    // const countryOfIssuance: string = myPayload.binData.countryOfIssuance;
    //
    // myDropin.teardown((error: any) => {
    //   if (error) {
    //     const tearDownError = [
    //       {
    //         message: JSON.stringify(error)
    //       },
    //     ];
    //     onError(tearDownError);
    //     console.log(error);
    //     return;
    //   }
    // });
    //
    // await myDropin.teardown();


})();

// function customFunction(options: dropin.Options) {
//   return;
// }
  },
   []);


  return (
    <S.Wrapper>
      <div id="dropin-ui-button" />
    </S.Wrapper>
  );
};


    // vom backend??
    // try {
    //   if (clientToken) {
    //     const cardData = (await braintreePayment(
    //       clientToken,
    //       creditCard
    //     )) as PaymentData;
    //     return cardData;
    //   } else {
    //     const braintreeTokenErrors = [
    //       {
    //         message:
    //           "Braintree gateway misconfigured. Client token not provided.",
    //       },
    //     ];
    //     setSubmitErrors(braintreeTokenErrors);

    // im frontend zum weiterverarbeiten??
    // const payment = await tokenizeCcCard(creditCard);
    // if (payment?.token) {
    //   processPayment(payment?.token, {
    //     brand: payment?.ccType,
    //     lastDigits: payment?.lastDigits,
    //   });



export { BraintreePaymentGateway }
