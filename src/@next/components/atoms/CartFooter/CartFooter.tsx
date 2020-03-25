import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Cart footer to use with conjunction of cart rows
 */
const CartFooter: React.FC<IProps> = ({
  subtotalPrice,
  totalPrice,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.SubtotalText>Subtotal</S.SubtotalText>
      <S.SubtotalPrice>{subtotalPrice}</S.SubtotalPrice>
      <S.TotalText>Total</S.TotalText>
      <S.TotalPrice>{totalPrice}</S.TotalPrice>
    </S.Wrapper>
  );
};

export { CartFooter };
