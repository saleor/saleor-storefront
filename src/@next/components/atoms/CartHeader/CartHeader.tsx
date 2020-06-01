import React from "react";

import * as S from "./styles";

/**
 * Cart header to use with conjunction of cart rows.
 */
const CartHeader: React.FC = () => {
  return (
    <S.Wrapper>
      <S.Column>Products</S.Column>
      <S.Column>Price</S.Column>
      <S.Column>Quantity</S.Column>
      <S.Column>Total Price</S.Column>
    </S.Wrapper>
  );
};

export { CartHeader };
