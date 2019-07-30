import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const Button: React.FC<IProps> = ({
  color = "primary",
  btnRef,
  children,
  full = false,
  size = "md",
  ...props
}: IProps) => {
  const ButtonWithTheme = color === "primary" ? S.Primary : S.Secondary;

  return (
    <ButtonWithTheme
      color={color}
      full={full}
      size={size}
      ref={btnRef}
      {...props}
    >
      <S.Text size={size}>{children}</S.Text>
    </ButtonWithTheme>
  );
};
