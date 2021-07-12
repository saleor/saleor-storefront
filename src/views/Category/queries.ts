import {
  ProductList,
  ProductListVariables,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductList";
import { productList } from "@saleor/sdk/lib/queries/products";
import { RequireOnlyOne } from "@saleor/sdk/lib/tsHelpers";

import { useTypedQuery } from "@graphql";
import { channelSlug } from "@temp/constants";
import { PRODUCTS_PER_PAGE } from "@temp/core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
} from "@temp/core/utils";
import { IFilters } from "@types";

export const useProductsQuery = (
  filters: IFilters,
  ids: RequireOnlyOne<{
    categoryId: string | undefined;
    collectionId: string | undefined;
  }>
) => {
  const { categoryId, collectionId } = ids;

  const variables: ProductListVariables = {
    filter: {
      price: {
        lte: filters.priceLte,
        gte: filters.priceGte,
      },
      collections: collectionId ? [collectionId] : [],
      categories: categoryId ? [categoryId] : [],
      attributes: filters.attributes
        ? convertToAttributeScalar(filters.attributes)
        : [],
    },
    channel: channelSlug,
    first: PRODUCTS_PER_PAGE,
    sortBy: convertSortByFromString(filters.sortBy),
  };

  return useTypedQuery<ProductList, ProductListVariables>(productList, {
    variables,
    fetchPolicy: "cache-and-network",
    skip: !(categoryId || collectionId),
  });
};
