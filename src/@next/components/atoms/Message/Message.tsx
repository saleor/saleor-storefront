import React from "react";

import { Icon } from "../Icon";
import * as S from "./styles";
import { IProps } from "./types";

export const Message: React.FC<IProps> = ({
  title,
  status = "neutral",
  children,
  onClose,
}: IProps) => (
  <S.Wrapper status={status}>
    <S.Title>{title}</S.Title>
    {children && <S.Content>{children}</S.Content>}
    <S.IconButton onClick={onClose}>
      <Icon name="x" size={15} />
    </S.IconButton>
  </S.Wrapper>
);
