import "./scss/index.scss";

import { parse as parseQs, stringify as stringifyQs } from "query-string";
import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { Debounce, Loader, ProductsList } from "../../components";
import { Error } from "../../components/Error";
import NetworkStatus from "../../components/NetworkStatus";
import { OfflinePlaceholder } from "../../components/OfflinePlaceholder";
import {
  AttributeList,
  Filters,
  ProductFilters
} from "../../components/ProductFilters";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { SearchResults } from "../../core/types/saleor";
import {
  convertToAttributeScalar,
  getAttributesFromQs
} from "../../core/utils";
import { GET_SEARCH_PRODUCTS } from "./queries";
import SearchPage from "./SearchPage";

type SearchViewProps = RouteComponentProps<{}>;

export const SearchView: React.SFC<SearchViewProps> = ({
  history,
  location
}) => {
  const qs = parseQs(location.search.substr(1));
  const attributes: AttributeList = getAttributesFromQs(qs);
  const filters: Filters = {
    attributes,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: qs.priceGte,
    priceLte: qs.priceLte,
    sortBy: qs.sortBy
  };

  return (
    <NetworkStatus>
      {isOnline => (
        <Query
          query={GET_SEARCH_PRODUCTS}
          variables={{
            ...filters,
            attributes: convertToAttributeScalar(filters.attributes),
            query: qs.q
          }}
          fetchPolicy="cache-and-network"
          errorPolicy="all"
        >
          {({ error, data, loading, fetchMore }) => {
            const canDisplayProducts =
              data &&
              data.attributes &&
              data.attributes.edges !== undefined &&
              data.products &&
              data.products.edges !== undefined &&
              data.products.totalCount !== undefined;

            const handleQueryChange = (
              event: React.ChangeEvent<HTMLInputElement>
            ) => {
              qs.q = event.target.value;
              history.replace("?" + stringifyQs(qs));
            };

            const handleLoadMore = () =>
              fetchMore({
                query: GET_SEARCH_PRODUCTS,
                updateQuery: (prev: SearchResults, { fetchMoreResult }) => {
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
                  query: qs.q
                }
              });

            const canDisplayFilters =
              data && data.attributes && data.attributes.edges !== undefined;

            return (
              <Debounce debounce={handleQueryChange} value={qs.q}>
                {({ change, value: query }) => (
                  <SearchPage onQueryChange={change} query={query}>
                    {canDisplayFilters ? (
                      <>
                        <ProductFilters
                          attributes={data.attributes.edges.map(
                            edge => edge.node
                          )}
                          filters={filters}
                          onAttributeFiltersChange={(attribute, values) => {
                            qs[attribute] = values;
                            history.replace("?" + stringifyQs(qs));
                          }}
                          onPriceChange={(field, value) => {
                            qs[field] = value;
                            history.replace("?" + stringifyQs(qs));
                          }}
                        />
                        {canDisplayProducts && (
                          <ProductsList
                            displayLoader={loading}
                            products={data.products}
                            hasNextPage={data.products.pageInfo.hasNextPage}
                            filters={filters}
                            onLoadMore={handleLoadMore}
                            onOrder={sortBy => {
                              qs.sortBy = sortBy;
                              history.replace("?" + stringifyQs(qs));
                            }}
                          />
                        )}
                      </>
                    ) : !!error ? (
                      isOnline ? (
                        <Error error={error.message} />
                      ) : (
                        <OfflinePlaceholder />
                      )
                    ) : (
                      <Loader full />
                    )}
                  </SearchPage>
                )}
              </Debounce>
            );
          }}
        </Query>
      )}
    </NetworkStatus>
  );
};
export default SearchView;
