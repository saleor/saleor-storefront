export interface IButtonProps {
  action?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
}

export interface IProps {
  formId?: string;
  cancelBtn?: IButtonProps;
  disabled?: boolean;
  divider?: boolean;
  submitBtn: IButtonProps;
}
