import React from "react";

import { Icon } from "../Icon";

import * as S from "./styles";
import { IProps } from "./types";

export const IconButton: React.FC<IProps> = ({
  size = 36,
  onClick,
  ...props
}: IProps) => {
  return (
    <S.Wrapper onClick={onClick}>
      <Icon size={size} {...props} />
    </S.Wrapper>
  );
};
