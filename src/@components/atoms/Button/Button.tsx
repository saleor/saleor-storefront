import React from "react";

import { Main, Secondary, Text } from "./styles";
import { Props } from "./types";

export const Button: React.FC<Props> = ({
  secondary = false,
  btnRef,
  ...props
}) => {
  const ButtonWithTheme = secondary ? Secondary : Main;

  return (
    <ButtonWithTheme ref={btnRef} {...props}>
      <Text>Test</Text>
    </ButtonWithTheme>
  );
};
