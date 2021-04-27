import React from "react";

import { ListProductType } from "@temp/views/StorePage/Page";

import * as S from "./styles";

interface IProps {
  listProduct: ListProductType[];
  title: string;
}
function MainProductList({ listProduct, title }: IProps) {
  return (
    <S.Wrapper>
      <S.WrapperContainer style={{ margin: "20px 0" }}>
        <S.Title>{title}</S.Title>
        <S.List>
          {listProduct.map(item => {
            return (
              <S.Item key={item.id}>
                <S.ImgBox>
                  <S.Img src={item.imgUrl} />
                </S.ImgBox>
                <S.NameProduct>{item.name}</S.NameProduct>
                <S.TabBox>
                  {item.tab.map((item, index) => {
                    return <S.Tab key={index}>{item}</S.Tab>;
                  })}
                </S.TabBox>
              </S.Item>
            );
          })}
        </S.List>
      </S.WrapperContainer>
    </S.Wrapper>
  );
}

export default MainProductList;
