import React from "react";

import { Container } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductPage: React.FC<IProps> = ({ product }: IProps) => {
  return (
    <S.Wrapper>
      <Container>Product page template</Container>
    </S.Wrapper>
  );
};
