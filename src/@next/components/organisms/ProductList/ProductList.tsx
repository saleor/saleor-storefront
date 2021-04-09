import Link from "next/link";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import { Button, Loader } from "@components/atoms";
import { ProductTile } from "@components/molecules";

import Pagination from "../../../../components/Pagination";
import { generateProductUrl } from "../../../../core/utils";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductList: React.FC<IProps> = ({
  products,
  canLoadMore = false,
  loading = false,
  testingContextId,
  onLoadMore = () => null,
}: IProps) => {
  const [paging, setPaging] = useState({ curPage: 1, pageSize: 10 });
  const onChange = (curPage: number, pageSize: number) => {
    setPaging({ ...paging, pageSize, curPage });
  };
  return (
    <S.Wrapper>
      <S.List data-test="productList" data-test-id={testingContextId}>
        {products.map(product => {
          const { id, name } = product;
          return (
            id &&
            name && (
              <S.ListItem>
                <Link href={generateProductUrl(id, name)} key={id}>
                  <a>
                    <ProductTile product={product} />
                  </a>
                </Link>
              </S.ListItem>
            )
          );
        })}
      </S.List>
      <Pagination
        onChange={onChange}
        pageSize={10}
        totalPage={15}
        pageDisplay={5}
      />
      <S.Loader>
        {loading ? (
          <Loader />
        ) : (
          canLoadMore && (
            <Button
              testingContext="loadMoreProductsButton"
              color="secondary"
              onClick={onLoadMore}
            >
              <FormattedMessage defaultMessage="More +" />
            </Button>
          )
        )}
      </S.Loader>
    </S.Wrapper>
  );
};
