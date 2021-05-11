import { useRouter } from "next/router";
import React from "react";

import { generateProductUrl } from "@temp/core/utils";
import { ListProductType } from "@temp/views/StorePage/Page";

import * as S from "./styles";

interface IProps {
  listProduct: ListProductType[];
  title: string;
}
function MainProductList({ listProduct, title }: IProps) {
  const { push } = useRouter();
  const handleClick = (id: string, name: string) => {
    push(generateProductUrl(id, name));
  };
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
                <S.NameProduct onClick={() => handleClick(item.id, item.name)}>
                  {item.name}
                </S.NameProduct>
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
