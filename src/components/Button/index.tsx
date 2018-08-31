import * as React from "react";

import "./scss/index.scss";

const Button: React.SFC<React.HTMLProps<HTMLButtonElement>> = ({
  children,
  ...otherProps
}) => {
  return <button {...otherProps}>{children}</button>;
};

export default Button;
