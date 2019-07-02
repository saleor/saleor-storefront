export type Size = "md" | "sm";
export type Color = "base" | "secondary";

export interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?: Color;
  size?: Size;
  text: string;
}
