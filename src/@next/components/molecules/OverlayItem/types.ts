export interface IProps {
  label: string;
  selected?: boolean;
  onClick: (label: string) => void;
}
