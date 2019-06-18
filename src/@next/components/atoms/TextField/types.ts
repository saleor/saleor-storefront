export type Style = "white" | "grey";

// interface IClassNameArgs {
//   errors?: FormError[];
//   iconLeft?: React.ReactNode;
//   styleType?: Style;
// }

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: any; // FormError[]
  helpText?: string;
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  styleType?: Style;
}
