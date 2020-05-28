export interface IProps {
  name: string;
  checked?: boolean;
  onChange?: (event: React.SyntheticEvent) => void;
  children?: React.ReactNode;
  dataCy: string;
}
