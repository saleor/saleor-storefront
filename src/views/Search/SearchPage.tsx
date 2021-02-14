import { NextPage } from "next";
import * as React from "react";
import { StringParam, useQueryParam } from "use-query-params";

import { OfflinePlaceholder } from "@components/atoms";
import { FeaturedProducts } from "@graphql/gqlTypes/FeaturedProducts";
import { channelSlug } from "@temp/constants";
import { IFilters } from "@types";
import { FilterQuerySet, SORT_OPTIONS } from "@utils/collections";

import { NotFound } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  maybe,
} from "../../core/utils";
import { filtersChangeHandler } from "../Category/utils";
import Page from "./Page";
import { TypedSearchProductsQuery } from "./queries";

export interface SearchPageProps {
  data: FeaturedProducts;
}

export const SearchPage: NextPage<SearchPageProps> = ({
  data: featuredProducts,
}) => {
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [search, setSearch] = useQueryParam("q", StringParam);
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

  const variables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    channel: channelSlug,
    query: search || null,
    sortBy: convertSortByFromString(filters.sortBy),
  };

  const clearFilters = () => setAttributeFilters({});

  return (
    <NetworkStatus>
      {isOnline => (
        <TypedSearchProductsQuery
          variables={variables}
          errorPolicy="all"
          loaderFull
        >
          {({ loading, data, loadMore }) => {
            const canDisplayFilters =
              !!data?.attributes?.edges && !!data?.products?.edges;

            if (canDisplayFilters) {
              const handleLoadMore = () =>
                loadMore(
                  (prev, next) => ({
                    ...prev,
                    products: {
                      ...prev.products,
                      edges: [...prev.products.edges, ...next.products.edges],
                      pageInfo: next.products.pageInfo,
                    },
                  }),
                  { after: data.products.pageInfo.endCursor }
                );

              return (
                <Page
                  clearFilters={clearFilters}
                  attributes={data.attributes.edges.map(edge => edge.node)}
                  displayLoader={loading}
                  hasNextPage={maybe(
                    () => data.products.pageInfo.hasNextPage,
                    false
                  )}
                  sortOptions={SORT_OPTIONS}
                  setSearch={setSearch}
                  search={search}
                  activeSortOption={filters.sortBy}
                  filters={filters}
                  products={data.products}
                  featuredProducts={featuredProducts.collection.products.edges.map(
                    e => e.node
                  )}
                  onAttributeFiltersChange={filtersChangeHandler(
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
                  onOrder={value => {
                    setSort(value.value);
                  }}
                />
              );
            }

            if (data && data.products === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
          }}
        </TypedSearchProductsQuery>
      )}
    </NetworkStatus>
  );
};
