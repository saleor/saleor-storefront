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
import { IFormError } from "@types";

export interface ICheckoutPaymentSubpageHandles {
  submitPayment: () => void;
}
interface IProps extends RouteComponentProps<any> {
  paymentGatewayFormRef: React.RefObject<HTMLFormElement>;
  changeSubmitProgress: (submitInProgress: boolean) => void;
  onSubmitSuccess: () => void;
  onPaymentGatewayError: (errors: IFormError[]) => void;
}

const CheckoutPaymentSubpageWithRef: RefForwardingComponent<
  ICheckoutPaymentSubpageHandles,
  IProps
> = (
  {
    paymentGatewayFormRef,
    changeSubmitProgress,
    onSubmitSuccess,
    onPaymentGatewayError,
    ...props
  }: IProps,
  ref
) => {
  const { promoCodeDiscount, addPromoCode, removePromoCode } = useCheckout();

  const [promoCodeErrors, setPromoCodeErrors] = useState<IFormError[]>([]);

  const promoCodeDiscountFormId = "discount-form";
  const promoCodeDiscountFormRef = useRef<HTMLFormElement>(null);
  const intl = useIntl();

  useImperativeHandle(ref, () => ({
    submitPayment: () => {
      if (promoCodeDiscountFormRef.current) {
        promoCodeDiscountFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else if (paymentGatewayFormRef.current) {
        paymentGatewayFormRef.current.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        changeSubmitProgress(false);
        onPaymentGatewayError([
          { message: intl.formatMessage(commonMessages.choosePaymentMethod) },
        ]);
      }
    },
  }));

  const handleAddPromoCode = async (promoCode: string) => {
    const { dataError } = await addPromoCode(promoCode);
    const errors = dataError?.error;
    if (errors) {
      changeSubmitProgress(false);
      setPromoCodeErrors(errors);
    } else {
      setPromoCodeErrors([]);
      if (paymentGatewayFormRef.current) {
        paymentGatewayFormRef.current.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        changeSubmitProgress(false);
        onPaymentGatewayError([
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
      if (paymentGatewayFormRef.current) {
        paymentGatewayFormRef.current.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        changeSubmitProgress(false);
        onPaymentGatewayError([
          { message: intl.formatMessage(commonMessages.choosePaymentMethod) },
        ]);
      }
    }
  };
  const handleSubmitUnchangedDiscount = () => {
    if (paymentGatewayFormRef.current) {
      paymentGatewayFormRef.current.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    } else {
      changeSubmitProgress(false);
      onPaymentGatewayError([
        { message: intl.formatMessage(commonMessages.choosePaymentMethod) },
      ]);
    }
  };

  return (
    <CheckoutPayment
      {...props}
      promoCodeDiscountFormId={promoCodeDiscountFormId}
      promoCodeDiscountFormRef={promoCodeDiscountFormRef}
      promoCodeDiscount={{
        voucherCode: promoCodeDiscount?.voucherCode,
      }}
      addPromoCode={handleAddPromoCode}
      removeVoucherCode={handleRemovePromoCode}
      submitUnchangedDiscount={handleSubmitUnchangedDiscount}
      promoCodeErrors={promoCodeErrors}
    />
  );
};

const CheckoutPaymentSubpage = forwardRef(CheckoutPaymentSubpageWithRef);

export { CheckoutPaymentSubpage };
