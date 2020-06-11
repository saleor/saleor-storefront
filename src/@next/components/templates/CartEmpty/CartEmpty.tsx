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
        <S.TitleFirstLine>Twój koszyk</S.TitleFirstLine>
        <S.TitleSecondLine>wygląda na pusty</S.TitleSecondLine>
        <S.HR />
        <S.Subtitle>Być może nie podjąłeś jeszcze wyboru</S.Subtitle>
        <S.ContinueButton>{button}</S.ContinueButton>
      </S.Wrapper>
    </Container>
  );
};

export { CartEmpty };
