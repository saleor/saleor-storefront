export interface IProps {
  value: string;
  name: string;
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  /**
   * If true, it will not wrap radio input in label tag.
   */
  customLabel?: boolean;
}
