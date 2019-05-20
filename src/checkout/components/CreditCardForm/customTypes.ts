import { ICardErrors, ICardInputs } from "../../../core/payments/braintree";

type ICardName = "ccCsc" | "ccExp" | "ccNumber";

interface ICardText {
  ccCsc: string;
  ccExp: string;
  ccNumber: string;
}

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
  cardText: ICardText;
  cardValues: ICardInputs;
  focusedInputName: ICardName;
  handleSubmit: (e: React.FormEvent, formData: any) => void;
  inputProps: IInputProps;
}
