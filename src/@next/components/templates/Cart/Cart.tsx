import React from "react";

import { Container } from "..";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Cart with list of products added by user.
 */
const Cart: React.FC<IProps> = ({
  breadcrumbs,
  title,
  cart,
  button,
}: IProps) => {
  return (
    <Container>
      <S.Breadcrumbs>{breadcrumbs}</S.Breadcrumbs>
      <S.Title>{title}</S.Title>
      <S.Cart>{cart}</S.Cart>
      <S.ProceedButton>{button}</S.ProceedButton>
    </Container>
  );
};

export { Cart };
