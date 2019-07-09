export type Position = "left" | "right";
export interface IProps {
  children: React.ReactNode;
  hide: () => void;
  position: Position;
  show: boolean;
  target?: HTMLElement | null;
  title?: string;
}
