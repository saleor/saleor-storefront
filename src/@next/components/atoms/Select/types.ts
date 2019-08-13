export interface IProps {
  options: string[];
  label?: string;
  defaultValue?: string;
  name: string;
  setFieldValue: (field: string, value: string) => void;
}
