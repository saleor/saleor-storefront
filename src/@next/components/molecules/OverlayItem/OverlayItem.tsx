import React from "react";

import { Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const OverlayItem: React.FC<IProps> = ({
  label,
  selected,
  onClick,
}: IProps) => {
  const handleClick = () => onClick(label);
  return (
    <S.Wrapper selected={!!selected} onClick={handleClick}>
      {label}
      {selected && <Icon name="tick" size={16} />}
    </S.Wrapper>
  );
};
