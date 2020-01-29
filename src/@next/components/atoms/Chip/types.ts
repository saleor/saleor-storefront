import React from "react";

export type Size = "md" | "sm";

export interface IProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  color?: "primary" | "secondary";
  closeBtnRef?: React.RefObject<HTMLButtonElement>;
  fullWidth?: boolean;
  size?: Size;
  onClose?: () => void;
}
