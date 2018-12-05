import { parse as parseQs, stringify as stringifyQs } from "query-string";
import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { Loader } from "../../components";
import { Error } from "../../components/Error";
import NetworkStatus from "../../components/NetworkStatus";
import { NotFound } from "../../components/NotFound";
import { OfflinePlaceholder } from "../../components/OfflinePlaceholder";
import { AttributeList, Filters } from "../../components/ProductFilters";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { Category } from "../../core/types/saleor";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getAttributesFromQs,
  getGraphqlIdFromDBId,
  maybe
} from "../../core/utils";
import { CategoryPage } from "./CategoryPage";
import { GET_CATEGORY_AND_ATTRIBUTES } from "./queries";

type CategoryViewProps = RouteComponentProps<{
  id: string;
}>;

export const CategoryView: React.SFC<CategoryViewProps> = ({
  match,
  location,
  history
}) => {
  const qs = parseQs(location.search.substr(1));
  const attributes: AttributeList = getAttributesFromQs(qs);
  const filters: Filters = {
    attributes,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: qs.priceGte || null,
    priceLte: qs.priceLte || null,
    sortBy: qs.sortBy || null
  };
  return (
    <NetworkStatus>
      {isOnline => (
        <Query
          query={GET_CATEGORY_AND_ATTRIBUTES}
          variables={{
            ...filters,
            attributes: convertToAttributeScalar(filters.attributes),
            id: getGraphqlIdFromDBId(match.params.id, "Category"),
            sortBy: convertSortByFromString(filters.sortBy)
          }}
          fetchPolicy="cache-and-network"
          errorPolicy="all"
        >
          {({ loading, error, data, fetchMore }) => {
            const canDisplayFilters = maybe(
              () => data.attributes.edges && data.category.name,
              false
            );
            if (canDisplayFilters) {
              const handleLoadMore = () =>
                fetchMore({
                  query: GET_CATEGORY_AND_ATTRIBUTES,
                  updateQuery: (prev: Category, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                      return prev;
                    }
                    return {
                      ...prev,
                      products: {
                        ...prev.products,
                        edges: [
                          ...prev.products.edges,
                          ...fetchMoreResult.products.edges
                        ],
                        pageInfo: fetchMoreResult.products.pageInfo
                      }
                    };
                  },
                  variables: {
                    ...filters,
                    after: data.products.pageInfo.endCursor,
                    attributes: convertToAttributeScalar(filters.attributes),
                    id: getGraphqlIdFromDBId(match.params.id, "Category"),
                    sortBy: convertSortByFromString(filters.sortBy)
                  }
                });
              return (
                <CategoryPage
                  attributes={data.attributes.edges.map(edge => edge.node)}
                  category={data.category}
                  displayLoader={loading}
                  hasNextPage={maybe(
                    () => data.products.pageInfo.hasNextPage,
                    false
                  )}
                  filters={filters}
                  products={data.products}
                  onAttributeFiltersChange={(attribute, values) => {
                    qs[attribute] = values;
                    history.replace("?" + stringifyQs(qs));
                  }}
                  onLoadMore={handleLoadMore}
                  onOrder={sortBy => {
                    qs.sortBy = sortBy;
                    history.replace("?" + stringifyQs(qs));
                  }}
                  onPriceChange={(field, value) => {
                    qs[field] = value;
                    history.replace("?" + stringifyQs(qs));
                  }}
                />
              );
            }
            if (data && data.category === null) {
              return <NotFound />;
            }
            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            if (error && !data) {
              return <Error error={error.message} />;
            }
            return <Loader full />;
          }}
        </Query>
      )}
    </NetworkStatus>
  );
};

export default CategoryView;
