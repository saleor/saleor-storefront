export interface IButtonProps {
  action?: (e: React.ReactEventHandler) => void;
  text: string;
}

export interface IProps {
  formId: string;
  cancelBtn?: IButtonProps;
  submitBtn: IButtonProps;
}
