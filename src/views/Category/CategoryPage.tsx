import { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
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

export type CategoryPageProps = {
  params: { slug: string } | undefined;
  data: ({ id: string } & CategoryData) | undefined | null;
};

export const CategoryPage: NextPage<CategoryPageProps> = ({
  data: { products: ssrProducts, ...category },
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

  const { data, loadMore, loading } = useProductsQuery(filters, category?.id);

  const { clientProducts, pageInfo } = useMemo(
    () => ({
      clientProducts: data?.products?.edges.map(e => e.node) || [],
      pageInfo: data?.products?.pageInfo,
    }),
    [data]
  );

  /**
   * For best UX, when there are no filters/sorting applied,
   * initial batch of products is served from SSR.
   */

  const serveClientProducts = !!sort || !!attributeFilters;
  const [products, setProducts] = useState<CategoryData["products"]>(
    serveClientProducts ? clientProducts : ssrProducts
  );

  const hasNextPage = serveClientProducts
    ? pageInfo?.hasNextPage
    : category.numberOfProducts > ssrProducts.length;

  const handleClearFilters = () => {
    setAttributeFilters({});
    setProducts([]);
  };

  const handleFiltersChange = (attributeSlug: string, value: string) => {
    setProducts([]);
    filtersChangeHandler(
      filters,
      attributeFilters,
      setAttributeFilters
    )(attributeSlug, value);
  };

  const handleLoadMore = () => {
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

    if (!serveClientProducts) {
      setServeClientProducts(true);
    }
  };

  useEffect(() => {
    // console.log(clientProducts);
    if (!loading) {
      setProducts(serveClientProducts ? clientProducts : ssrProducts);
    }
  }, [data]);

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
                category={{ ...category, products }}
                displayLoader={serveClientProducts ? loading : false}
                hasNextPage={hasNextPage}
                activeSortOption={filters.sortBy}
                filters={filters}
                onAttributeFiltersChange={handleFiltersChange}
                onLoadMore={handleLoadMore}
                activeFilters={Object.keys(filters?.attributes || {}).length}
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
