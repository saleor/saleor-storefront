import { parse as parseQs, stringify as stringifyQs } from "query-string";
import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { Loader } from "../../components";
import { Error } from "../../components/Error";
import NetworkStatus from "../../components/NetworkStatus";
import { NotFound } from "../../components/NotFound";
import { OfflinePlaceholder } from "../../components/OfflinePlaceholder";
import { AttributeList, Filters } from "../../components/ProductsList";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { getGraphqlIdFromDBId } from "../../core/utils";
import { CategoryPage } from "./CategoryPage";
import { GET_CATEGORY_AND_ATTRIBUTES } from "./queries";

interface AttributesType {
  [attributeSlug: string]: string[];
}

type CategoryViewProps = RouteComponentProps<{
  id: string;
}>;

const convertToAttributeScalar = (attributes: AttributesType) =>
  Object.entries(attributes)
    .map(
      ([key, value]) =>
        typeof value === "string"
          ? key + ":" + value
          : value.map(attribute => key + ":" + attribute)
    )
    .reduce(
      (prev, curr) =>
        typeof curr === "string" ? [...prev, curr] : [...prev, ...curr],
      []
    );

export const CategoryView: React.SFC<CategoryViewProps> = ({
  match,
  location,
  history
}) => {
  const qs = parseQs(location.search.substr(1));
  const attributeKeys = Object.keys(qs).filter(
    key => !["pageSize", "priceGte", "priceLte", "sortBy"].includes(key)
  );
  const attributes: AttributeList = attributeKeys.reduce((prev, curr) => {
    prev[curr] = typeof qs[curr] === "string" ? [qs[curr]] : qs[curr];
    return prev;
  }, {});
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
            id: getGraphqlIdFromDBId(match.params.id, "Category")
          }}
          fetchPolicy="cache-and-network"
          errorPolicy="all"
          key={match.params.id}
        >
          {({ loading, error, data }) => {
            const canDisplay =
              data &&
              data.attributes &&
              data.attributes.edges !== undefined &&
              data.products &&
              data.products.edges !== undefined &&
              data.products.totalCount !== undefined &&
              data.category &&
              data.category.name;

            if (canDisplay) {
              return (
                <>
                  <CategoryPage
                    attributes={data.attributes}
                    category={data.category}
                    filters={filters}
                    hasNextPage={!loading}
                    products={data.products}
                    onAttributeFiltersChange={(attribute, values) => {
                      const newAttributes = filters.attributes;
                      qs[attribute] = values;
                      history.replace("?" + stringifyQs(qs));
                    }}
                    onPriceChange={(field, value) => {
                      qs[field] = value;
                      history.replace("?" + stringifyQs(qs));
                    }}
                    onOrder={sortBy =>
                      this.setState({
                        sortBy
                      })
                    }
                  />
                  {loading && <Loader />}
                </>
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
