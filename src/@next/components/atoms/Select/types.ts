export interface IProps {
  value: any;
  name?: string;
  options?: any[];
  autoComplete?: string;
  defaultValue?: any;
  optionLabelKey?: string;
  menuIsOpen?: boolean;
  customStyles?: any;
  optionValueKey?: string;
  onChange: (value: any, name?: any) => void;
  customComponents?: {
    Control: (props?: any) => JSX.Element | null;
    IndicatorSeparator: (props?: any) => JSX.Element | null;
    IndicatorsContainer: (props?: any) => JSX.Element | null;
    Option: (props?: any) => JSX.Element | null;
  };
}
