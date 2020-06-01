import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * The basic button
 */
export const Button: React.FC<IProps> = ({
  color = "primary",
  btnRef,
  children,
  dataCy,
  fullWidth = false,
  size = "md",
  ...props
}: IProps) => {
  const ButtonWithTheme = color === "primary" ? S.Primary : S.Secondary;

  return (
    <ButtonWithTheme  
      data-cy={dataCy}
      color={color}
      fullWidth={fullWidth}
      size={size}
      ref={btnRef}
      {...props}
    >
      <S.Text size={size}>{children}</S.Text>
    </ButtonWithTheme>
  );
};
