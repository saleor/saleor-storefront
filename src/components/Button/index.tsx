import * as React from "react";

import "./scss/index.scss";

interface ButtonType extends React.HTMLProps<HTMLButtonElement> {
  secondary?: boolean;
}

const Button: React.SFC<ButtonType> = ({
  children,
  secondary,
  ...otherProps
}) => (
  <button {...otherProps} className={secondary ? "secondary" : ""}>
    <span>{children}</span>
  </button>
);

export default Button;
