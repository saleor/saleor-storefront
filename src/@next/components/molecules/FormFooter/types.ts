export interface IButtonProps {
  action?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

export interface IProps {
  formId?: string;
  cancelBtn?: IButtonProps;
  disabled?: boolean;
  divider?: boolean;
  submitBtn: IButtonProps;
}
