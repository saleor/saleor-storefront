import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router";

import { CheckoutPayment } from "@components/organisms";
import { useCheckout } from "@saleor/sdk";
import { commonMessages } from "@temp/intl";
import { ICardData, IFormError } from "@types";

export interface ICheckoutPaymentSubpageHandles {
  submitPayment: () => void;
}
interface IProps extends RouteComponentProps<any> {
  paymentGatewayFormRef?: React.RefObject<HTMLFormElement>;
  selectPaymentGateway: (paymentGateway: string) => void;
  changeSubmitProgress: (submitInProgress: boolean) => void;
  onSubmitSuccess: () => void;
}

const CheckoutPaymentSubpageWithRef: RefForwardingComponent<
  ICheckoutPaymentSubpageHandles,
  IProps
> = (
  {
    paymentGatewayFormRef,
    changeSubmitProgress,
    selectPaymentGateway,
    onSubmitSuccess,
    ...props
  }: IProps,
  ref
) => {
  const {
    availablePaymentGateways,
    promoCodeDiscount,
    addPromoCode,
    removePromoCode,
    createPayment,
  } = useCheckout();

  const [gatewayErrors, setGatewayErrors] = useState<IFormError[]>([]);
  const [promoCodeErrors, setPromoCodeErrors] = useState<IFormError[]>([]);

  const paymentGateways = availablePaymentGateways || [];

  const promoCodeDiscountFormId = "discount-form";
  const promoCodeDiscountFormRef = useRef<HTMLFormElement>(null);
  const intl = useIntl();

  useImperativeHandle(ref, () => ({
    submitPayment: () => {
      if (promoCodeDiscountFormRef.current) {
        promoCodeDiscountFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else if (paymentGatewayFormRef?.current) {
        paymentGatewayFormRef.current.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        changeSubmitProgress(false);
        setGatewayErrors([
          { message: intl.formatMessage(commonMessages.choosePaymentMethod) },
        ]);
      }
    },
  }));

  const handleProcessPayment = async (
    gateway: string,
    token: string,
    cardData?: ICardData
  ) => {
    const { dataError } = await createPayment(gateway, token, cardData);
    const errors = dataError?.error;
    changeSubmitProgress(false);
    if (errors) {
      setGatewayErrors(errors);
    } else {
      setGatewayErrors([]);
      onSubmitSuccess();
    }
  };
  const handlePaymentGatewayError = () => {
    changeSubmitProgress(false);
  };
  const handleAddPromoCode = async (promoCode: string) => {
    const { dataError } = await addPromoCode(promoCode);
    const errors = dataError?.error;
    if (errors) {
      changeSubmitProgress(false);
      setPromoCodeErrors(errors);
    } else {
      setPromoCodeErrors([]);
      if (paymentGatewayFormRef?.current) {
        paymentGatewayFormRef.current.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        changeSubmitProgress(false);
        setGatewayErrors([
          { message: intl.formatMessage(commonMessages.choosePaymentMethod) },
        ]);
      }
    }
  };
  const handleRemovePromoCode = async (promoCode: string) => {
    const { dataError } = await removePromoCode(promoCode);
    const errors = dataError?.error;
    if (errors) {
      changeSubmitProgress(false);
      setPromoCodeErrors(errors);
    } else {
      setPromoCodeErrors([]);
      if (paymentGatewayFormRef?.current) {
        paymentGatewayFormRef.current.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        changeSubmitProgress(false);
        setGatewayErrors([
          { message: intl.formatMessage(commonMessages.choosePaymentMethod) },
        ]);
      }
    }
  };
  const handleSubmitUnchangedDiscount = () => {
    if (paymentGatewayFormRef?.current) {
      paymentGatewayFormRef.current.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    } else {
      changeSubmitProgress(false);
      setGatewayErrors([
        { message: intl.formatMessage(commonMessages.choosePaymentMethod) },
      ]);
    }
  };

  return (
    <CheckoutPayment
      {...props}
      gatewayErrors={gatewayErrors}
      paymentGateways={paymentGateways}
      selectPaymentGateway={selectPaymentGateway}
      promoCodeDiscountFormId={promoCodeDiscountFormId}
      promoCodeDiscountFormRef={promoCodeDiscountFormRef}
      promoCodeDiscount={{
        voucherCode: promoCodeDiscount?.voucherCode,
      }}
      addPromoCode={handleAddPromoCode}
      removeVoucherCode={handleRemovePromoCode}
      submitUnchangedDiscount={handleSubmitUnchangedDiscount}
      promoCodeErrors={promoCodeErrors}
      processPayment={handleProcessPayment}
      onGatewayError={handlePaymentGatewayError}
    />
  );
};

const CheckoutPaymentSubpage = forwardRef(CheckoutPaymentSubpageWithRef);

export { CheckoutPaymentSubpage };
