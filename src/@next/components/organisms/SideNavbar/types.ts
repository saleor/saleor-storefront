import { items } from "./stories";

export interface IProps {
  onHide: (show: boolean) => void;
  show: boolean;
  target?: HTMLElement | null;
  items: items;
}

export interface IState {
  buffer: {
    index: number | null;
    depth: number | null;
  };
  index: number | null;
  depth: number | null;
}
