import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const Tile: React.FC<IProps> = ({ header, children }) => {
  return (
    <S.Wrapper>
      <S.Header>{header}</S.Header>
      {children}
    </S.Wrapper>
  );
};
