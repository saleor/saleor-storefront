import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const TileGrid: React.FC<IProps> = ({
  elements,
  xs = 12,
  md = 4,
  lg = 4,
  sm = 12,
}: IProps) => {
  return (
    <S.Wrapper>
      {elements.map((element: React.ReactNode) => (
        <S.Tile>{element}</S.Tile>
      ))}
    </S.Wrapper>
  );
};
