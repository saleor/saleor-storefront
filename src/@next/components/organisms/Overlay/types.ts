export type Position = "center" | "left" | "right";

export interface IProps {
  children: React.ReactNode;
  duration?: number;
  hide: () => void;
  position: Position;
  show: boolean;
  target?: HTMLElement | null;
  transparent?: boolean;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext?: string;
  /**
   * Used as marker for writing e2e tests. Use unique ID to differentiate
   * multiple elements in the same view from each other
   */
  testingContextId?: string;
}

export type TransitionState =
  | "unmounted"
  | "entering"
  | "entered"
  | "exiting"
  | "exited";
