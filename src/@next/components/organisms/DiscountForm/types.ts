export interface IDiscountFormData {
  giftCards?: any[];
  promoCode?: any;
}

export interface IProps {
  discount?: IDiscountFormData;
  handleApplyDiscount?: (inputCode: string) => void;
  handleRemovePromoCode?: () => void;
  defaultValue?: any;
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  errors?: any;
  handleSubmit?: (formData: IDiscountFormData | undefined) => void;
  handleChange?: (e: React.ChangeEvent) => void;
  handleBlur?: (e: React.FocusEvent) => void;
}
