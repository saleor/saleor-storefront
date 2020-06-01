import React from "react";

export type Size = "md" | "sm";
export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button color type
   */
  color?: "primary" | "secondary";
  /**
   * Reference to HTML button element
   */
  btnRef?: React.RefObject<HTMLButtonElement>;
  /**
   * Whether width should take all available space
   */
  fullWidth?: boolean;
  /**
   * Size
   */
  size?: Size;
  /**
   * Unique name used as selector for writing e2e tests in Cypress
   */
  dataCy: string;
}
