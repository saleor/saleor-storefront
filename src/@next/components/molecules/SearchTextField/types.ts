export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  contentLeft?: React.ReactNode;
  contentRight?: React.ReactNode;
  value: string;
  onReset: () => void;
}
