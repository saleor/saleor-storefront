import React from "react";

import { Loader } from "@components/atoms";

import { Container } from "../Container";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Template for checkout page.
 */
const Checkout: React.FC<IProps> = ({
  loading,
  navigation,
  checkout,
  cartSummary,
  button,
}: IProps) => {
  return (
    <Container>
      {loading && (
        <S.Loader>
          <Loader fullScreen={true} />
        </S.Loader>
      )}
      <S.Wrapper>
        <S.Navigation>{navigation}</S.Navigation>
        <S.Checkout>{checkout}</S.Checkout>
        <S.CartSummary>{cartSummary}</S.CartSummary>
        <S.Button>{button}</S.Button>
      </S.Wrapper>
    </Container>
  );
};

export { Checkout };
