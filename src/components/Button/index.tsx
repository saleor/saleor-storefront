import * as React from "react";

import "./scss/index.scss";

const Button: React.SFC<React.HTMLProps<HTMLButtonElement>> = ({
  children,
  ...otherProps
}) => (
  <button>
    <span>{children}</span>
  </button>
);

export default Button;
