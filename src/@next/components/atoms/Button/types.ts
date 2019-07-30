import React from "react";

export type Size = "md" | "sm";
export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary";
  btnRef?: React.RefObject<HTMLButtonElement>;
  fullWidth?: boolean;
  size?: Size;
}
