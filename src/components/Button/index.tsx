import * as React from "react";

import "./scss/index.scss";

type ButtonType = "submit" | "reset" | "button";
export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  secondary?: boolean;
  btnRef?: React.RefObject<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  secondary,
  btnRef,
  type,
  ...otherProps
}) => (
  <button
    className={`button ${secondary ? "secondary" : ""} ${className}`}
    ref={btnRef}
    type={type as ButtonType}
    {...otherProps}
  >
    <span>{children}</span>
  </button>
);

export default Button;
