export interface IDiscountFormData {
  giftCards?: any[];
  promoCode?: any;
}

export interface IProps {
  discount?: IDiscountFormData;
  defaultValue?: any;
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  errors?: any;
  handleSubmit?: (formData: IDiscountFormData | undefined) => void;
  handleChange?: (e: React.ChangeEvent) => void;
  handleBlur?: (e: React.FocusEvent) => void;
}
