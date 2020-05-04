import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

import { Container } from "../Container";

/**
 * Template for empty cart page.
 */
const CartEmpty: React.FC<IProps> = ({ button }: IProps) => {
  return (
    <Container>
      <S.Wrapper>
        <S.TitleFirstLine>Your Cart</S.TitleFirstLine>
        <S.TitleSecondLine>looks empty</S.TitleSecondLine>
        <S.HR />
        <S.Subtitle>Maybe you haven’t made your choices yet</S.Subtitle>
        <S.ContinueButton>{button}</S.ContinueButton>
      </S.Wrapper>
    </Container>
  );
};

export { CartEmpty };
