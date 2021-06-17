import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { RouteComponentProps } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutReview } from "@components/organisms";
import { statuses as dummyStatuses } from "@components/organisms/DummyPaymentGateway";
import { useCheckout } from "@saleor/sdk";
import { IFormError } from "@types";
import { getJsonFromUrl } from "../../../utils/misc";

export interface ISubmitCheckoutData {
  id: string;
  orderNumber: string;
  token: string;
}

export interface ICheckoutReviewSubpageHandles {
  complete: () => void;
}

interface IProps extends RouteComponentProps<any> {
  selectedPaymentGatewayToken?: string;
  paymentGatewayFormRef: React.RefObject<HTMLFormElement>;
  changeSubmitProgress: (submitInProgress: boolean) => void;
  onSubmitSuccess: (data: ISubmitCheckoutData) => void;
  onSubmitFailure: (data: Array<{ message: string }>) => void;
}

const CheckoutReviewSubpageWithRef: RefForwardingComponent<
  ICheckoutReviewSubpageHandles,
  IProps
> = (
  {
    selectedPaymentGatewayToken,
    paymentGatewayFormRef,
    changeSubmitProgress,
    onSubmitSuccess,
    onSubmitFailure,
    ...props
  }: IProps,
  ref
) => {
  const { checkout, payment, completeCheckout } = useCheckout();
  const [paymentCISecret, setPaymentCISecret] = useState<string>("");
  const [errors, setErrors] = useState<IFormError[]>([]);
  const [iframe, setIframe] = useState(false);

  const checkoutShippingAddress = checkout?.shippingAddress
    ? {
        ...checkout?.shippingAddress,
        phone: checkout?.shippingAddress?.phone || undefined,
      }
    : undefined;

  const checkoutBillingAddress = checkout?.billingAddress
    ? {
        ...checkout?.billingAddress,
        phone: checkout?.billingAddress?.phone || undefined,
      }
    : undefined;

  const getPaymentMethodDescription = () => {
    if (payment?.gateway === "mirumee.payments.dummy") {
      return `Dummy: ${
        dummyStatuses.find(
          status => status.token === selectedPaymentGatewayToken
        )?.label
      }`;
    }
    if (payment?.gateway === "mirumee.payments.adyen") {
      return `Adyen payments`;
    }
    if (payment?.creditCard) {
      return `Ending in ${payment?.creditCard.lastDigits}`;
    }
    return ``;
  };

  useEffect(() => {
    const dataLayer = {
      event: "checkout",
      ecommerce: {
        checkout: {
          actionField: { step: 4 },
        },
      },
    };

    if (window) {
      // @ts-ignore
      window?.dataLayer.push(dataLayer);
      // eslint-disable-next-line func-names
      // @ts-ignore
      window?.dataLayer.push(function (this: any) {
        this.reset();
      });
    }
  }, []);

  // I'm ashamed of myself please SK forgive me
  // I'm using shippingAdddress.streetAddress2 to add a note field in checkout
  // const getNoteFromInput = event => {
  //   const shippingAddress = checkout?.shippingAddress;
  //   if (!shippingAddress || !checkout || !checkout?.email) return null;
  //   const note = event.target.value;
  //   shippingAddress.streetAddress2 = note;
  //   setShippingAddress(shippingAddress, checkout?.email);
  // };

  useImperativeHandle(ref, () => ({
    complete: async () => {
      changeSubmitProgress(true);
      let data;
      let dataError;
      if (payment?.gateway === "mirumee.payments.adyen") {
        paymentGatewayFormRef.current?.dispatchEvent(
          new Event("submitComplete", { cancelable: true })
        );
      } else {
        const response = await completeCheckout();
        // console.log(response);
        data = response.data;
        // console.log(data);
        if (data?.confirmationNeeded) {
          changeSubmitProgress(false);
          // tslint:disable-next-line: variable-name
          const {
            action_required_data: { redirect_to_url },
            payment_data,
          } = JSON.parse(data.confirmationData);
          if (!redirect_to_url?.url) {
            setErrors([]);
            return;
          }
          const urlParams = getJsonFromUrl(redirect_to_url?.url);
          // console.log(redirect_to_url, urlParams, payment_data);
          if (
            urlParams &&
            (urlParams.payment_intent_client_secret || payment_data)
          ) {
            // console.log("ma ci entri?");
            const client_secret =
              urlParams.payment_intent_client_secret || payment_data;
            setPaymentCISecret(client_secret);
          }
          setIframe(redirect_to_url?.url);
        } else {
          dataError = response.dataError;
          changeSubmitProgress(false);
          const errors = dataError?.error;
          if (errors) {
            setErrors(errors);
          } else {
            setErrors([]);

            const dataLayer = {
              ecommerce: {
                purchase: {
                  actionField: {
                    id: data?.order?.id,
                    token: data?.order?.token,
                    number: data?.order?.number,
                    revenue: payment?.total?.amount,
                  },
                  products: [data?.order?.lines],
                },
              },
            };

            if (window) {
              // @ts-ignore
              window?.dataLayer.push(dataLayer);
              // eslint-disable-next-line func-names
              // @ts-ignore
              window?.dataLayer.push(function (this: any) {
                this.reset();
              });
            }

            onSubmitSuccess({
              id: data?.order?.id,
              orderNumber: data?.order?.number,
              token: data?.order?.token,
            });
          }
        }
      }
    },
  }));

  const on3DSComplete = async () => {
    // Hide the 3DS UI
    setIframe(false);
    setErrors([]);
    changeSubmitProgress(true);
    // console.log(1);

    if (!process.env.STRIPE_PUBLIC_KEY) {
      // console.log(2);
      changeSubmitProgress(false);
      const error = [
        {
          message:
            "Ops! Il pagamento non è andato a buon fine, ti abbiamo riportato allo step di pagamento. Contattaci a !TOBEREPLACED, saremo felici di aiutarti!",
        },
      ];
      setErrors(error);
      onSubmitFailure(error);
      return;
    }
    // console.log(3);
    const stripe = await loadStripe(process?.env?.STRIPE_PUBLIC_KEY);
    // Check the PaymentIntent
    // console.log(paymentCISecret);
    if (!paymentCISecret) {
      
      return;
    }
    stripe?.retrievePaymentIntent(paymentCISecret).then(async result => {
      if (result.error) {
        changeSubmitProgress(false);
        const error = [
          {
            message:
              "Ops! Il pagamento non è andato a buon fine, ti abbiamo riportato allo step di pagamento. Contattaci a !TOBEREPLACED, saremo felici di aiutarti!",
          },
        ];
        setErrors(error);
        onSubmitFailure(error);
      } else {
        console.log(result);
        if (result?.paymentIntent?.status === "requires_confirmation") {
          const response = await completeCheckout();
          const data = response?.data;
          const dataError = response?.dataError;
          const errors = dataError?.error;
          if (errors) {
            setErrors(errors);
          } else {
            setErrors([]);

            const dataLayer = {
              ecommerce: {
                purchase: {
                  actionField: {
                    id: data?.order?.id,
                    token: data?.order?.token,
                    number: data?.order?.number,
                    revenue: payment?.total?.amount,
                  },
                  products: [data?.order?.lines],
                },
              },
            };

            if (window) {
              // @ts-ignore
              window?.dataLayer.push(dataLayer);
              // eslint-disable-next-line func-names
              // @ts-ignore
              window?.dataLayer.push(function (this: any) {
                this.reset();
              });
            }

            changeSubmitProgress(false);
            onSubmitSuccess({
              id: data?.order?.id,
              orderNumber: data?.order?.number,
              token: data?.order?.token,
            });
          }
        } else {
          // Authentication failed, prompt the customer to enter another payment method4
          changeSubmitProgress(false);
          const error = [
            {
              message:
                "Ops! Il pagamento non è andato a buon fine, ti abbiamo riportato allo step di pagamento. Contattaci a !TOBEREPLACED, saremo felici di aiutarti!",
            },
          ];
          setErrors(error);
          onSubmitFailure(error);
        }
      }
    });
  };

  useEffect(() => {
    // @ts-ignore
    const handler = event => {
      if (event.data === "3DS-authentication-complete") {
        on3DSComplete();
      }
    };

    window.addEventListener("message", handler);

    return () => window.removeEventListener("message", handler);
  });

  return (
    <>
      <CheckoutReview
        {...props}
        shippingAddress={checkoutShippingAddress}
        billingAddress={checkoutBillingAddress}
        shippingMethodName={checkout?.shippingMethod?.name}
        paymentMethodName={getPaymentMethodDescription()}
        email={checkout?.email}
        errors={errors}
        // @ts-ignore
        iframe={iframe}
      />
    </>
  );
};

const CheckoutReviewSubpage = forwardRef(CheckoutReviewSubpageWithRef);

export { CheckoutReviewSubpage };