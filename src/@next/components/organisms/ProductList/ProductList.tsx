import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import { generatePath } from "react-router";

import { Button, Loader } from "@components/atoms";
import { ProductTile } from "@components/molecules";
import { paths } from "@paths";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductList: React.FC<IProps> = ({
  products,
  canLoadMore = false,
  loading = false,
  testingContextId,
  onLoadMore = () => null,
}) => (
  <>
    <S.List data-test="productList" data-test-id={testingContextId}>
      {products.map(product => {
        const { slug, name } = product;
        return (
          slug &&
          name && (
            <Link href={generatePath(paths.product, { slug })} key={slug}>
              <a>
                <ProductTile product={product} />
              </a>
            </Link>
          )
        );
      })}
    </S.List>
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
  </>
);
