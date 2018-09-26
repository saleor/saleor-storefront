import * as React from "react";

import "./scss/index.scss";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  secondary?: boolean;
}

const Button: React.SFC<ButtonProps> = ({
  children,
  secondary,
  ...otherProps
}) => (
  <button className={secondary ? "secondary" : ""} {...otherProps}>
    <span>{children}</span>
  </button>
);

export default Button;
