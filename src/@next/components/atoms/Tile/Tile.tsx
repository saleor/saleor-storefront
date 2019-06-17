import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const Tile: React.FC<IProps> = ({
  header,
  children,
  ...props
}: IProps) => {
  return (
    <S.Wrapper {...props}>
      <S.Header>
        <S.Content>{header}</S.Content>
      </S.Header>
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
};
