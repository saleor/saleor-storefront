declare module "react-payment-inputs" {
  export interface CardNumberProps extends InputHTMLAttributes {}

  export interface ExpiryDateProps extends InputHTMLAttributes {}

  export interface CVCProps extends InputHTMLAttributes {}

  type GetPropsFunction<T> = (props: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) => T;

  export function usePaymentInputs(
    Options
  ): {
    getCardNumberProps: GetPropsFunction<CardNumberProps>;
    getExpiryDateProps: GetPropsFunction<ExpiryDateProps>;
    getCVCProps: GetPropsFunction<CVCProps>;
  };
}

interface Options {
  onError: (onErrorsProps: {
    message: string;
    fields: Record<T, string | undefined>;
  }) => void;
}
