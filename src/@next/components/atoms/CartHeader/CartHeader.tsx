import React from "react";

import * as S from "./styles";

/**
 * Cart header to use with conjunction of cart rows.
 */
const CartHeader: React.FC = () => {
  return (
    <S.Wrapper>
      <S.Column>Produkty</S.Column>
      <S.Column>Cena</S.Column>
      <S.Column>Ilość</S.Column>
      <S.Column>Wartość</S.Column>
    </S.Wrapper>
  );
};

export { CartHeader };
