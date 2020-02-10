export type Position = "center" | "left" | "right";

export interface IProps {
  children: React.ReactNode;
  duration?: number;
  hide: () => void;
  position: Position;
  show: boolean;
  target?: HTMLElement | null;
  transparent?: boolean;
}

export type TransitionState =
  | "unmounted"
  | "entering"
  | "entered"
  | "exiting"
  | "exited";
