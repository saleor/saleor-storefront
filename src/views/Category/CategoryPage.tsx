import { useProductList } from "@saleor/sdk";
import { ProductListVariables } from "@saleor/sdk/lib/queries/gqlTypes/ProductList";
import { NextPage } from "next";
import React from "react";
import { StringParam, useQueryParam } from "use-query-params";

import { OfflinePlaceholder } from "@components/atoms";
import { channelSlug } from "@temp/constants";
import { convertSortByFromString } from "@temp/core/utils";
import { IFilters } from "@types";
import { FilterQuerySet, SORT_OPTIONS } from "@utils/collections";

import { MetaWrapper, NotFound } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { CategoryData, Page } from "./Page";

export type CategoryPageProps = {
  params: { slug: string } | undefined;
  data: ({ id: string } & CategoryData) | undefined | null;
};

export const CategoryPage: NextPage<CategoryPageProps> = ({ params, data }) => {
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
    ...filters,
    first: PRODUCTS_PER_PAGE,
    channel: channelSlug,
    sortBy: convertSortByFromString(filters.sortBy),
  };
  const x = useProductList(variables);

  const checkIfHasNextPage = () =>
    sort || attributeFilters
      ? true
      : data.numberOfProducts > data.products.length;

  const clearFilters = () => setAttributeFilters({});

  const handleLoadMore = () => {};

  const onFiltersChange = (name, value) => {
    if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
      if (attributeFilters[name].includes(value)) {
        if (filters.attributes[`${name}`].length === 1) {
          const att = { ...attributeFilters };
          delete att[`${name}`];
          setAttributeFilters({
            ...att,
          });
        } else {
          setAttributeFilters({
            ...attributeFilters,
            [`${name}`]: attributeFilters[`${name}`].filter(
              item => item !== value
            ),
          });
        }
      } else {
        setAttributeFilters({
          ...attributeFilters,
          [`${name}`]: [...attributeFilters[`${name}`], value],
        });
      }
    } else {
      setAttributeFilters({ ...attributeFilters, [`${name}`]: [value] });
    }
  };

  return (
    <NetworkStatus>
      {isOnline =>
        isOnline ? (
          data ? (
            <MetaWrapper
              meta={{
                description: data.categoryDetails.seoDescription,
                title: data.categoryDetails.seoTitle,
                type: "product.category",
              }}
            >
              <Page
                clearFilters={clearFilters}
                data={data}
                // displayLoader={loading}
                displayLoader={false}
                hasNextPage={checkIfHasNextPage()}
                sortOptions={SORT_OPTIONS}
                activeSortOption={filters.sortBy}
                filters={filters}
                onAttributeFiltersChange={onFiltersChange}
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
  // return (
  //   <NetworkStatus>
  //     {isOnline =>
  //       isOnline ? (
  //         <TypedCategoryProductsDataQuery
  //           variables={variables}
  //           errorPolicy="all"
  //           loaderFull
  //         >
  //           {categoryData => {
  //             if (categoryData.loading) {
  //               return <Loader />;
  //             }

  //             if (categoryData.data && categoryData.data.category === null) {
  //               return <NotFound />;
  //             }

  //             const canDisplayFilters =
  //               !!categoryData.data?.attributes?.edges &&
  //               !!categoryData.data?.category?.name;

  //             return (
  //               <TypedCategoryProductsQuery variables={variables}>
  //                 {categoryProducts => {
  //                   if (!canDisplayFilters && categoryProducts.loading) {
  //                     return <Loader />;
  //                   }

  //                   if (canDisplayFilters) {
  //                     const handleLoadMore = () =>
  //                       categoryProducts.loadMore(
  //                         (prev, next) => ({
  //                           ...prev,
  //                           products: {
  //                             ...prev.products,
  //                             edges: [
  //                               ...prev.products.edges,
  //                               ...next.products.edges,
  //                             ],
  //                             pageInfo: next.products.pageInfo,
  //                           },
  //                         }),
  //                         {
  //                           after:
  //                             categoryProducts.data.products.pageInfo.endCursor,
  //                         }
  //                       );

  //                     return (
  //                       <MetaWrapper
  //                         meta={{
  //                           description:
  //                             categoryData.data.category.seoDescription,
  //                           title: categoryData.data.category.seoTitle,
  //                           type: "product.category",
  //                         }}
  //                       >
  //                         <Page
  //                           clearFilters={clearFilters}
  //                           attributes={categoryData.data.attributes.edges.map(
  //                             edge => edge.node
  //                           )}
  //                           category={categoryData.data.category}
  //                           displayLoader={categoryData.loading}
  //                           hasNextPage={
  //                             categoryProducts.data?.products?.pageInfo
  //                               .hasNextPage
  //                           }
  //                           sortOptions={sortOptions}
  //                           activeSortOption={filters.sortBy}
  //                           filters={filters}
  //                           products={categoryProducts.data.products}
  //                           onAttributeFiltersChange={onFiltersChange}
  //                           onLoadMore={handleLoadMore}
  //                           activeFilters={
  //                             filters!.attributes
  //                               ? Object.keys(filters!.attributes).length
  //                               : 0
  //                           }
  //                           onOrder={value => {
  //                             setSort(value.value);
  //                           }}
  //                         />
  //                       </MetaWrapper>
  //                     );
  //                   }

  //                   return null;
  //                 }}
  //               </TypedCategoryProductsQuery>
  //             );
  //           }}
  //         </TypedCategoryProductsDataQuery>
  //       ) : (
  //         <OfflinePlaceholder />
  //       )
  //     }
  //   </NetworkStatus>
  // );
};
