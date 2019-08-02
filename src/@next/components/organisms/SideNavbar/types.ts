import { items } from "./fixtures";

export interface IProps {
  onHide: (show: boolean) => void;
  show: boolean;
  target?: HTMLElement | null;
  // TODO: use codegen types
  items: typeof items;
}

export interface IState {
  buffer: {
    index: number | null;
    depth: number | null;
  };
  index: number | null;
  depth: number | null;
}
