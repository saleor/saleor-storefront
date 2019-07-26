export type Size = "md" | "sm";
export type Color = "base" | "secondary";

export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
  size?: Size;
  children: React.ReactNode;
}
