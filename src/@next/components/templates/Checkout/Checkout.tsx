import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Example component description.
 */
const Checkout: React.FC<IProps> = ({
  navigation,
  checkout,
  cartSummary,
  button,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Navigation>{navigation}</S.Navigation>
      <S.Checkout>{checkout}</S.Checkout>
      <S.CartSummary>{cartSummary}</S.CartSummary>
      <S.Button>{button}</S.Button>
    </S.Wrapper>
  );
};

export { Checkout };
