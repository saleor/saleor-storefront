import React from "react";

import closeImg from "images/x.svg";

import * as S from "./styles";
import { IProps } from "./types";

export const Message: React.FC<IProps> = ({
  title,
  status = "neutral",
  children,
  onClose,
}) => (
  <S.Wrapper status={status}>
    <S.Title>{title}</S.Title>
    {children && <S.Content>{children}</S.Content>}
    <S.CloseIcon path={closeImg} onClick={onClose} />
  </S.Wrapper>
);
