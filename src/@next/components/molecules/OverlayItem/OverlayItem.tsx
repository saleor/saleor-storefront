import React from "react";

import { Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const OverlayItem: React.FC<IProps> = ({
  children,
  selected,
  disabled,
  onClick,
}: IProps) => {
  return (
    <S.Wrapper selected={!!selected} disabled={!!disabled} onClick={onClick}>
      {children}
      {selected && <Icon name="tick" size={16} />}
    </S.Wrapper>
  );
};
