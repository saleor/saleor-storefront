import * as React from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router";

import { prodListHeaderCommonMsg } from "@temp/intl";
import { IFilters } from "@types";
import { StringParam, useQueryParam } from "use-query-params";
import { Loader } from "@components/atoms";
import { MetaWrapper, NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
  maybe,
} from "../../core/utils";
import Page from "./Page";
import {
  TypedCollectionProductsDataQuery,
  TypedCollectionProductsQuery,
} from "./queries";

type ViewProps = RouteComponentProps<{
  id: string;
}>;

export const FilterQuerySet = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach(value => {
      str.push(`${value}_${valueObj[value].join("_")}`);
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj = {};
    const propsWithValues = strValue.split(".").filter(n => n);
    propsWithValues.map(value => {
      const propWithValues = value.split("_").filter(n => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

export const View: React.FC<ViewProps> = ({ match }) => {
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );
  const intl = useIntl();

  const clearFilters = () => {
    setAttributeFilters({});
  };

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
    id: getGraphqlIdFromDBId(match.params.id, "Collection"),
    sortBy: convertSortByFromString(filters.sortBy),
  };

  const sortOptions = [
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsClear),
      value: null,
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPrice),
      value: "price",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPriceDsc),
      value: "-price",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsName),
      value: "name",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsNameDsc),
      value: "-name",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsUpdatedAt),
      value: "updated_at",
    },
    {
      label: intl.formatMessage(
        prodListHeaderCommonMsg.sortOptionsUpdatedAtDsc
      ),
      value: "-updated_at",
    },
  ];

  return (
    <NetworkStatus>
      {isOnline => (
        <TypedCollectionProductsDataQuery
          variables={variables}
          errorPolicy="all"
          loaderFull
        >
          {collectionData => {
            if (collectionData.loading) {
              return <Loader />;
            }

            if (
              collectionData.data &&
              collectionData.data.collection === null
            ) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }

            const canDisplayFilters =
              !!collectionData.data?.attributes?.edges &&
              !!collectionData.data?.collection?.name;

            return (
              <TypedCollectionProductsQuery variables={variables}>
                {collectionProductsData => {
                  if (!canDisplayFilters && collectionProductsData.loading) {
                    return <Loader />;
                  }

                  if (canDisplayFilters) {
                    const handleLoadMore = () =>
                      collectionProductsData.loadMore(
                        (prev, next) => ({
                          collection: {
                            ...prev.collection,
                            products: {
                              ...prev.collection.products,
                              edges: [
                                ...prev.collection.products.edges,
                                ...next.collection.products.edges,
                              ],
                              pageInfo: next.collection.products.pageInfo,
                            },
                          },
                        }),
                        {
                          after:
                            collectionProductsData.data.collection.products
                              .pageInfo.endCursor,
                        }
                      );

                    return (
                      <MetaWrapper
                        meta={{
                          description:
                            collectionData.data.collection.seoDescription,
                          title: collectionData.data.collection.seoTitle,
                          type: "product.collection",
                        }}
                      >
                        <Page
                          clearFilters={clearFilters}
                          attributes={collectionData.data.attributes.edges.map(
                            edge => edge.node
                          )}
                          collection={collectionData.data.collection}
                          displayLoader={collectionData.loading}
                          hasNextPage={maybe(
                            () =>
                              collectionProductsData.data.collection.products
                                .pageInfo.hasNextPage,
                            false
                          )}
                          sortOptions={sortOptions}
                          activeSortOption={filters.sortBy}
                          filters={filters}
                          products={
                            collectionProductsData.data.collection.products
                          }
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
                    );
                  }

                  return null;
                }}
              </TypedCollectionProductsQuery>
            );
          }}
        </TypedCollectionProductsDataQuery>
      )}
    </NetworkStatus>
  );
};

export default View;
