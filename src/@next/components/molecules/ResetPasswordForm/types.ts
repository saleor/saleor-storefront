export interface IProps {
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange?: (e: React.ChangeEvent) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  errors: any;
  values: any;
  tokenError: boolean;
  passwordError: string;
}
