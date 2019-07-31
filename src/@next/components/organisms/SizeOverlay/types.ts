export interface IProps {
  hide: () => void;
  selected?: string;
  show: boolean;
  target?: HTMLElement | null;
  values: string[];
}
