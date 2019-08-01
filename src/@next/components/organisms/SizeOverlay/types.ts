export interface IProps {
  hide: () => void;
  onClick: (value: string) => void;
  selected?: string;
  show: boolean;
  target?: HTMLElement | null;
  values: string[];
}
