import React from "react";

import { Primary, Secondary, Text } from "./styles";
import { Props } from "./types";

export const Button: React.FC<Props> = ({
  color = "primary",
  btnRef,
  children,
  ...props
}) => {
  const ButtonWithTheme = color === "primary" ? Primary : Secondary;

  return (
    <ButtonWithTheme color={color} ref={btnRef} {...props}>
      <Text>{children}</Text>
    </ButtonWithTheme>
  );
};
