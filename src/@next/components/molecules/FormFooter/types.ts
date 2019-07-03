export interface IButtonProps {
  action?: (e: any) => void;
  text: string;
}

export interface IProps {
  formId?: string;
  cancelBtn?: IButtonProps;
  divider?: boolean;
  submitBtn: IButtonProps;
}
