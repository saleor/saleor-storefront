import { NextPage } from "next";
import * as React from "react";
import { StringParam, useQueryParam } from "use-query-params";

import { OfflinePlaceholder } from "@components/atoms";
import { IFilters } from "@types";
import { FilterQuerySet, SORT_OPTIONS } from "@utils/collections";

import { MetaWrapper, NotFound } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { useProductsQuery } from "../Category/queries";
import { filtersChangeHandler } from "../Category/utils";
import { CollectionData, Page } from "./Page";

export type CollectionViewProps = {
  params: { slug: string } | undefined;
  data: ({ id: string } & CollectionData) | undefined | null;
};

export const CollectionView: NextPage<CollectionViewProps> = ({
  data: collection,
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
    collectionId: collection?.id,
  });
  const [products, pageInfo, numberOfProducts] = React.useMemo(
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
          collection ? (
            <MetaWrapper
              meta={{
                description: collection.details.seoDescription,
                title: collection.details.seoTitle,
                type: "product.collection",
              }}
            >
              <Page
                numberOfProducts={numberOfProducts}
                clearFilters={handleClearFilters}
                collection={collection}
                displayLoader={loading}
                hasNextPage={!!pageInfo?.hasNextPage}
                sortOptions={SORT_OPTIONS}
                activeSortOption={filters.sortBy}
                filters={filters}
                products={products}
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
