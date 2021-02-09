import {
  ProductList,
  ProductListVariables,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductList";
import { productList } from "@saleor/sdk/lib/queries/products";

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
  categoryId: string | undefined
) => {
  const variables = {
    filter: {
      price: {
        lte: filters.priceLte,
        gte: filters.priceGte,
      },
      categories: [categoryId],
      channel: channelSlug,
      attributes: filters.attributes
        ? convertToAttributeScalar(filters.attributes)
        : {},
    },
    channel: channelSlug,
    first: PRODUCTS_PER_PAGE,
    sortBy: convertSortByFromString(filters.sortBy),
  };

  return useTypedQuery<ProductList, ProductListVariables>(productList, {
    variables,
    fetchPolicy: "cache-and-network",
    skip: !categoryId,
  });
};
