import { NextPage } from "next";
import React, { useMemo } from "react";
import { StringParam, useQueryParam } from "use-query-params";

import { OfflinePlaceholder } from "@components/atoms";
import { IFilters } from "@types";
import { FilterQuerySet } from "@utils/collections";

import { MetaWrapper, NotFound } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { CategoryData, Page } from "./Page";
import { useProductsQuery } from "./queries";
import { filtersChangeHandler } from "./utils";

export type CategoryViewProps = {
  params: { slug: string } | undefined;
  data: ({ id: string } & CategoryData) | undefined | null;
};

export const CategoryView: NextPage<CategoryViewProps> = ({
  data: category,
}) => {
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

  const { data, loadMore, loading } = useProductsQuery(filters, {
    categoryId: category?.id,
  });
  const [products, pageInfo, numberOfProducts] = useMemo(
    () => [
      data?.products?.edges.map(e => e.node) || [],
      data?.products?.pageInfo,
      data?.products?.totalCount || 0,
    ],
    [data]
  );

  const handleClearFilters = () => setAttributeFilters({});

  const handleFiltersChange = filtersChangeHandler(
    filters,
    attributeFilters,
    setAttributeFilters
  );

  const handleOrderChange = (value: { value?: string; label: string }) =>
    setSort(value.value);

  const handleLoadMore = () =>
    loadMore(
      (prev, next) => ({
        products: {
          ...prev.products,
          edges: [...prev.products.edges, ...next.products.edges],
          pageInfo: next.products.pageInfo,
        },
      }),
      pageInfo.endCursor
    );

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
                clearFilters={handleClearFilters}
                category={category}
                products={products}
                displayLoader={loading}
                hasNextPage={!!pageInfo?.hasNextPage}
                numberOfProducts={numberOfProducts}
                activeSortOption={filters.sortBy}
                filters={filters}
                onAttributeFiltersChange={handleFiltersChange}
                onLoadMore={handleLoadMore}
                activeFilters={Object.keys(filters?.attributes || {}).length}
                onOrder={handleOrderChange}
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
