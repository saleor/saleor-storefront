import { items } from "./stories";

export interface IProps {
  onHide: (show: boolean) => void;
  show: boolean;
  target?: HTMLElement | null;
  items: items;
}
