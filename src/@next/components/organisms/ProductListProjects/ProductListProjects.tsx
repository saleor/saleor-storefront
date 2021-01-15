import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { Button, Loader } from "@components/atoms";
import { ProductTileProjects } from "@components/molecules";

import { generateCollectionUrl } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductListProjects: React.FC<IProps> = ({
  products,
  canLoadMore = false,
  loading = false,
  testingContextId,
  onLoadMore = () => null,
}: IProps) => {
  return (
    <>
      <S.List data-test="ProductListProjects" data-test-id={testingContextId}>
        {products.map(product => {
          const { id, name } = product.collections[1];
          return (
            id &&
            name && (
              <Link to={generateCollectionUrl(id, name)} key={id}>
                <ProductTileProjects product={product} />
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
              <FormattedMessage defaultMessage="Carica Altri" />
            </Button>
          )
        )}
      </S.Loader>
    </>
  );
};
