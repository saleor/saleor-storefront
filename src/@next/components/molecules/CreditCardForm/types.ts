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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface IProps {
  formRef: React.RefObject<HTMLFormElement>;
  cardErrors: ICardErrors;
  cardText: ICardText;
  cardValues: ICardInputs;
  focusedInputName: ICardName | null;
  handleSubmit: (e: React.FormEvent, formData: any) => void;
  inputProps: IInputProps;
}
