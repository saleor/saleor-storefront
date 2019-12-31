import { ISelectOption } from "@types";

export interface IProps {
  title: React.ReactNode;
  values: ISelectOption[];
  hide: () => void;
  onSelect: (value: ISelectOption) => void;
  show: boolean;
  target?: HTMLElement | null;
}
