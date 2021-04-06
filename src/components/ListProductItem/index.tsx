import React from "react";

import * as S from "./styles";

function ListProductItem({ item }) {
  return (
    <S.Wrapper>
      <S.ImgContainer>
        <S.ImgProduct src={item.imgUrl} />
      </S.ImgContainer>
      <S.ProductInfo>
        <S.NameProduct>{item.name}</S.NameProduct>
        <S.Price>{item.price}</S.Price>
        <S.Category>{item.category}</S.Category>
      </S.ProductInfo>
    </S.Wrapper>
  );
}

export default ListProductItem;
