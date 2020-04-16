export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label or additional content which belongs to the radio.
   */
  children?: React.ReactNode;
  /**
   * If true, it will not wrap radio input in label tag.
   */
  customLabel?: boolean;
}
