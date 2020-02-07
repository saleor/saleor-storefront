import React from "react";

import { ProductList } from "@components/organisms";

import * as S from "./styles";
import { IProps } from "./types";

export const Wishlist: React.FC<IProps> = ({ wishlist }: IProps) => {
  return (
    <S.Wrapper>
      <ProductList
        products={wishlist ? wishlist.map(({ product }) => product) : []}
        loading={false}
        onLoadMore={() => null}
      />
    </S.Wrapper>
  );
};
