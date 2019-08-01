export interface IProps {
  hide: () => void;
  onClick: (label: string) => void;
  selected?: string;
  show: boolean;
  target?: HTMLElement | null;
  values: string[];
}
