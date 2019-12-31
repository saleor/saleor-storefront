import { ISelectOption } from "@types";

export interface IProps {
  values: ISelectOption[];
  hide: () => void;
  onSelect: (value: ISelectOption) => void;
  show: boolean;
  target?: HTMLElement | null;
}
