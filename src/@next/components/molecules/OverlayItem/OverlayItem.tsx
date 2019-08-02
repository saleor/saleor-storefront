import React from "react";

import { Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const OverlayItem: React.FC<IProps> = ({
  children,
  selected,
  onClick,
}: IProps) => {
  return (
    <S.Wrapper selected={!!selected} onClick={onClick}>
      {children}
      {selected && <Icon name="tick" size={16} />}
    </S.Wrapper>
  );
};
