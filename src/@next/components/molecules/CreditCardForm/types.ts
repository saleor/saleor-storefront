import {
  ICardErrors,
  ICardInputs,
  ICardName
} from "src/core/payments/braintree";

interface ICardText {
  ccCsc: string;
  ccExp: string;
  ccNumber: string;
}

interface IInputProps {
  customInput: React.ComponentType;
  disabled: boolean;
  onBlur: () => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface IProps {
  formRef: React.RefObject<HTMLFormElement>;
  cardErrors: ICardErrors;
  cardText: ICardText;
  focusedInputName: ICardName | null;
  handleSubmit: (formData: ICardInputs) => void;
  inputProps: IInputProps;
}
