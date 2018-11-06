import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { Loader } from "../../components";
import { Error } from "../../components/Error";
import NetworkStatus from "../../components/NetworkStatus";
import { NotFound } from "../../components/NotFound";
import { OfflinePlaceholder } from "../../components/OfflinePlaceholder";
import { Filters } from "../../components/ProductsList";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { Category } from "../../core/types/saleor";
import { getGraphqlIdFromDBId } from "../../core/utils";
import { CategoryPage } from "./CategoryPage";
import { GET_CATEGORY_AND_ATTRIBUTES } from "./queries";

interface AttributesType {
  [attributeSlug: string]: string[];
}

type CategoryViewProps = RouteComponentProps<{
  id: string;
}>;

const canDisplay = (data: Category) =>
  data &&
  data.attributes &&
  data.attributes.edges !== undefined &&
  data.products &&
  data.products.edges !== undefined &&
  data.products.totalCount !== undefined &&
  data.category &&
  data.category.name;

class CategoryView extends React.Component<CategoryViewProps, Filters> {
  constructor(props) {
    super(props);
    this.state = {
      attributes: {},
      pageSize: PRODUCTS_PER_PAGE,
      priceGte: null,
      priceLte: null,
      sortBy: ""
    };
  }

  onFiltersChange = filters => {
    this.setState(filters);
  };

  convertToAttributeScalar = (attributes: AttributesType) => {
    const attributesArray = [];
    Object.entries(attributes).forEach(([key, value]) => {
      value.forEach(attribute => attributesArray.push(key + ":" + attribute));
    });
    return attributesArray;
  };

  render() {
    return (
      <NetworkStatus>
        {isOnline => (
          <Query
            query={GET_CATEGORY_AND_ATTRIBUTES}
            variables={{
              ...this.state,
              attributes: this.convertToAttributeScalar(this.state.attributes),
              id: getGraphqlIdFromDBId(this.props.match.params.id, "Category")
            }}
            fetchPolicy="cache-and-network"
            errorPolicy="all"
            key={this.props.match.params.id}
          >
            {({ loading, error, data }) => {
              if (canDisplay(data)) {
                return (
                  <>
                    <CategoryPage
                      attributes={data.attributes}
                      category={data.category}
                      filters={this.state}
                      hasNextPage={!loading}
                      products={data.products}
                      onAttributeFiltersChange={(attribute, values) => {
                        const newAttributes = this.state.attributes;
                        newAttributes[attribute] = values;
                        this.setState({
                          attributes: newAttributes
                        });
                      }}
                      onPriceChange={(field, value) => {
                        field === "priceGte"
                          ? this.setState({
                              priceGte: value
                            })
                          : this.setState({
                              priceLte: value
                            });
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
  }
}

export default CategoryView;
