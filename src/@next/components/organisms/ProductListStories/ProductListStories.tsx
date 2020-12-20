import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { Button, Loader } from "@components/atoms";
import { ProductTileStories } from "@components/molecules";

import { generateCollectionUrl } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductListStories: React.FC<IProps> = ({
  products,
  canLoadMore = false,
  loading = false,
  testingContextId,
  onLoadMore = () => null,
}: IProps) => {
  return (
    <>
      <S.List data-test="ProductListStories" data-test-id={testingContextId}>
        {products.map(product => {
          const { id, name } = product.collections[0];
          return (
            id &&
            name && (
              <Link to={generateCollectionUrl(id, name)} key={id}>
                <ProductTileStories product={product} />
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
              <FormattedMessage defaultMessage="Load More" />
            </Button>
          )
        )}
      </S.Loader>
    </>
  );
};
