import * as React from "react";
import { RouteComponentProps } from "react-router";

import NetworkStatus from "../../components/NetworkStatus";
import { NotFound } from "../../components/NotFound";
import { OfflinePlaceholder } from "../../components/OfflinePlaceholder";
import { AttributeList, Filters } from "../../components/ProductFilters";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getAttributesFromQs,
  getGraphqlIdFromDBId,
  maybe,
  parseQueryString,
  updateQueryString
} from "../../core/utils";
import { CategoryPage } from "./CategoryPage";
import { TypedCategoryProductsQuery } from "./queries";

type CategoryViewProps = RouteComponentProps<{
  id: string;
}>;

export const CategoryView: React.SFC<CategoryViewProps> = ({
  match,
  location,
  history
}) => {
  const querystring = parseQueryString(location);
  const updateQs = updateQueryString(location, history);
  const attributes: AttributeList = getAttributesFromQs(querystring);

  const filters: Filters = {
    attributes,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: querystring.priceGte || null,
    priceLte: querystring.priceLte || null,
    sortBy: querystring.sortBy || null
  };
  const variables = {
    ...filters,
    attributes: convertToAttributeScalar(filters.attributes),
    id: getGraphqlIdFromDBId(match.params.id, "Category"),
    sortBy: convertSortByFromString(filters.sortBy)
  };

  return (
    <NetworkStatus>
      {isOnline => (
        <TypedCategoryProductsQuery
          variables={variables}
          errorPolicy="all"
          loaderFull
        >
          {({ loading, data, loadMore }) => {
            const canDisplayFilters = maybe(
              () => !!data.attributes.edges && !!data.category.name,
              false
            );

            if (canDisplayFilters) {
              const handleLoadMore = () =>
                loadMore(
                  (prev, next) => ({
                    ...prev,
                    products: {
                      ...prev.products,
                      edges: [...prev.products.edges, ...next.products.edges],
                      pageInfo: next.products.pageInfo
                    }
                  }),
                  { after: data.products.pageInfo.endCursor }
                );

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
                  onAttributeFiltersChange={updateQs}
                  onLoadMore={handleLoadMore}
                  onOrder={value => updateQs("sortBy", value)}
                  onPriceChange={updateQs}
                />
              );
            }

            if (data && data.category === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
          }}
        </TypedCategoryProductsQuery>
      )}
    </NetworkStatus>
  );
};

export default CategoryView;
