import React from "react";
import { StringParam, useQueryParam } from "use-query-params";

import { Loader } from "@components/atoms";
import { useAtrributes, useCategoryDetails, useProductList } from "@sdk/react";
import { maybe } from "@utils/tsUtils";
import {
  MetaWrapper,
  NetworkStatus,
  NotFound,
  OfflinePlaceholder
} from "../../../../components";
import {
  convertSortByFromString,
  getGraphqlIdFromDBId
} from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";
import { FilterParam } from "./utils";

const PRODUCTS_PER_PAGE = 8;

export const Category: React.FC<IProps> = ({ match }: IProps) => {
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [filters, setFilters] = useQueryParam("filters", FilterParam);

  const variables = {
    id: getGraphqlIdFromDBId(match.params.id, "Category"),
    pageSize: PRODUCTS_PER_PAGE,
    sortBy: convertSortByFromString(sort || null),
  };

  const { data: category, loading: loadingCategory } = useCategoryDetails({
    id: variables.id,
  });
  const { data: attributes, loading: loadingAttributes } = useAtrributes({
    id: variables.id,
  });
  const { data: products, loading: loadingProducts, loadMore } = useProductList(
    {
      ...variables,
    }
  );
  return (
    <S.Wrapper>
      <NetworkStatus>
        {isOnline => {
          if (!isOnline) {
            return <OfflinePlaceholder />;
          }
          if (!loadingCategory) {
            if (category !== null) {
              return (
                <MetaWrapper
                  meta={{
                    description: category.seoDescription,
                    title: category.seoTitle,
                    type: "product.category",
                  }}
                >
                  <p>załadowano</p>
                </MetaWrapper>
              );
            } else {
              return <NotFound />;
            }
          } else {
            return <Loader />;
          }
        }}
      </NetworkStatus>
    </S.Wrapper>
  );
};
