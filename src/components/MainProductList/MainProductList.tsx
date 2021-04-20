import React from "react";

import * as S from "./styles";

interface IProps {
  listProduct: {
    id: number;
    imgUrl: string;
    name: string;
    prices?: number;
    type?: string;
    tab: string[];
  }[];
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
                {item.prices ? (
                  <>
                    <S.PriceBox>
                      <S.Price>
                        {item.prices}
                        <S.Type>/ {item.type}</S.Type>
                      </S.Price>
                    </S.PriceBox>
                    <S.PriceBox>
                      <S.Price>
                        {item.prices}
                        <S.Type>/ (Min, Order)</S.Type>
                      </S.Price>
                    </S.PriceBox>
                  </>
                ) : null}
              </S.Item>
            );
          })}
        </S.List>
      </S.WrapperContainer>
    </S.Wrapper>
  );
}

export default MainProductList;
