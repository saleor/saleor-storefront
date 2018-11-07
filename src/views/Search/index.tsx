import "./scss/index.scss";

import { parse as parseQs, stringify as stringifyQs } from "query-string";
import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { Loader, ProductsList, Debounce } from "../../components";
import { Error } from "../../components/Error";
import NetworkStatus from "../../components/NetworkStatus";
import { OfflinePlaceholder } from "../../components/OfflinePlaceholder";
import { AttributeList, Filters } from "../../components/ProductsList";
import { PRODUCTS_PER_PAGE } from "../../core/config";
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
    priceGte: qs.priceGte || null,
    priceLte: qs.priceLte || null,
    sortBy: qs.sortBy || null
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
          {({ error, data, loading }) => {
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

            return (
              <Debounce debounce={handleQueryChange} value={qs.q}>
                {({ change, value: query }) => (
                  <SearchPage onQueryChange={change} query={query}>
                    {canDisplayProducts ? (
                      <ProductsList
                        products={data.products}
                        hasNextPage={!loading}
                        filters={filters}
                        attributes={data.attributes.edges.map(
                          edge => edge.node
                        )}
                        onAttributeFiltersChange={(attribute, values) => {
                          qs[attribute] = values;
                          history.replace("?" + stringifyQs(qs));
                        }}
                        onPriceChange={(field, value) => {
                          qs[field] = value;
                          history.replace("?" + stringifyQs(qs));
                        }}
                        onOrder={sortBy => {
                          qs.sortBy = sortBy;
                          history.replace("?" + stringifyQs(qs));
                        }}
                      />
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
