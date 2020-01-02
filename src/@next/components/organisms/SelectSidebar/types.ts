import { ISelectOption } from "@types";

export interface IProps {
  title: React.ReactNode;
  options: ISelectOption[];
  selected?: string[];
  disabled?: string[];
  hide: () => void;
  onSelect: (value: string) => void;
  show: boolean;
  target?: HTMLElement | null;
}
