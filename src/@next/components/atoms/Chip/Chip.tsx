import React from "react";

import { Icon } from "../Icon";
import * as S from "./styles";
import { IProps } from "./types";

export const Chip: React.FC<IProps> = ({
  color = "primary",
  closeBtnRef,
  children,
  fullWidth = false,
  size = "md",
  onClose = () => null,
  ...props
}: IProps) => {
  const ChipWithTheme = color === "primary" ? S.Primary : S.Secondary;

  return (
    <ChipWithTheme color={color} fullWidth={fullWidth} size={size} {...props}>
      <S.Text size={size}>{children}</S.Text>
      <S.CloseButton
        size={size}
        color={color}
        ref={closeBtnRef}
        onClick={onClose}
      >
        <Icon name="x_light" size={16} />
      </S.CloseButton>
    </ChipWithTheme>
  );
};
