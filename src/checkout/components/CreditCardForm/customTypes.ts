import { ICardErrors, ICardInputs } from "../../../core/payments/braintree";

type ICardName = "ccCsc" | "ccExp" | "ccNumber";

interface IInputProps {
  customInput: React.ComponentType;
  disabled: boolean;
  onBlur: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface ICreditCardForm {
  formRef: React.RefObject<HTMLFormElement>;
  cardErrors: ICardErrors;
  cardValues: ICardInputs;
  focusedInputName: ICardName;
  handleSubmit: (e: React.FormEvent, formData: any) => void;
  inputProps: IInputProps;
}
