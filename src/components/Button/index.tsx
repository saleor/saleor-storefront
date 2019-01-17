import * as React from "react";

import "./scss/index.scss";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  secondary?: boolean;
  btnRef?: React.RefObject<HTMLButtonElement>;
}

const Button: React.SFC<ButtonProps> = ({
  children,
  secondary,
  btnRef,
  ...otherProps
}) => (
  <button className={secondary ? "secondary" : ""} ref={btnRef} {...otherProps}>
    <span>{children}</span>
  </button>
);

export default Button;
