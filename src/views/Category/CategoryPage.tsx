import { useProductList } from "@saleor/sdk";
import { ProductListVariables } from "@saleor/sdk/lib/queries/gqlTypes/ProductList";
import { NextPage } from "next";
import React, { useState } from "react";
import { StringParam, useQueryParam } from "use-query-params";

import { OfflinePlaceholder } from "@components/atoms";
import { channelSlug } from "@temp/constants";
import {
  convertSortByFromString,
  convertToAttributeScalar,
} from "@temp/core/utils";
import { IFilters } from "@types";
import { FilterQuerySet, SORT_OPTIONS } from "@utils/collections";

import { MetaWrapper, NotFound } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { CategoryData, Page } from "./Page";
import { handleFiltersChange } from "./utils";

export type CategoryPageProps = {
  params: { slug: string } | undefined;
  data: ({ id: string } & CategoryData) | undefined | null;
};

export const CategoryPage: NextPage<CategoryPageProps> = ({ data }) => {
  const { products: ssrProducts, ...category } = data;
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );

  const filters: IFilters = {
    attributes: attributeFilters,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: null,
    priceLte: null,
    sortBy: sort || null,
  };
  const variables: ProductListVariables = {
    filter: {
      price: {
        lte: filters.priceLte,
        gte: filters.priceGte,
      },
      categories: [category?.id],
      channel: channelSlug,
      attributes: filters.attributes
        ? convertToAttributeScalar(filters.attributes)
        : {},
    },
    channel: channelSlug,
    first: PRODUCTS_PER_PAGE,
    sortBy: convertSortByFromString(filters.sortBy),
  };

  const { next, data: clientProducts = [], pageInfo, loading } = useProductList(
    variables
  );
  /**
   * For best UX, when there are no filters/sorting applied,
   * initial batch of products is served from SSR.
   */
  const [serveClientProducts, setServeClientProducts] = useState(
    !!sort || !!attributeFilters || clientProducts?.length > PRODUCTS_PER_PAGE
  );

  const hasNextPage = serveClientProducts
    ? pageInfo?.hasNextPage
    : category.numberOfProducts > ssrProducts.length;

  const clearFilters = () => setAttributeFilters({});

  const handleLoadMore = () => {
    next();
    if (!serveClientProducts) {
      setServeClientProducts(true);
    }
  };

  return (
    <NetworkStatus>
      {isOnline =>
        isOnline ? (
          category ? (
            <MetaWrapper
              meta={{
                description: category.details.seoDescription,
                title: category.details.seoTitle,
                type: "product.category",
              }}
            >
              <Page
                clearFilters={clearFilters}
                category={{
                  ...category,
                  products: serveClientProducts ? clientProducts : ssrProducts,
                }}
                displayLoader={serveClientProducts ? loading : false}
                hasNextPage={hasNextPage}
                sortOptions={SORT_OPTIONS}
                activeSortOption={filters.sortBy}
                filters={filters}
                onAttributeFiltersChange={handleFiltersChange(
                  filters,
                  attributeFilters,
                  setAttributeFilters
                )}
                onLoadMore={handleLoadMore}
                activeFilters={
                  filters!.attributes
                    ? Object.keys(filters!.attributes).length
                    : 0
                }
                onOrder={value => setSort(value.value)}
              />
            </MetaWrapper>
          ) : (
            <NotFound />
          )
        ) : (
          <OfflinePlaceholder />
        )
      }
    </NetworkStatus>
  );
};
