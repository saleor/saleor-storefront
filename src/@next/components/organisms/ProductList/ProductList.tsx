import React from "react";
import { Link } from "react-router-dom";

import { ProductTile } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductList: React.FC<IProps> = ({ products }: IProps) => {
  return (
    <S.Wrapper>
      {products.map(product => (
        // <Link
        //   to={generateProductUrl(product.id, product.name)}
        //   key={product.id}
        // >
        <ProductTile product={product} />
        // </Link>
      ))}
    </S.Wrapper>
  );
};
