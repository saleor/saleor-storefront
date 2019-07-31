import React from "react";

import { Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const OverlayItem: React.FC<IProps> = ({ label, selected }: IProps) => {
  return (
    <S.Wrapper selected={!!selected}>
      {label}
      {selected && <Icon name="plus" size={16} />}
    </S.Wrapper>
  );
};
