export interface IProps {
  value: any;
  name: string;
  label?: string;
  options?: any[];
  autoComplete?: string;
  defaultValue?: any;
  optionLabelKey?: string;
  optionValueKey?: string;
  onChange?: (name: string, value: string) => void;
}
