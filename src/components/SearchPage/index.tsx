import { parse } from "query-string";
import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";

import { Loader, ProductsList, TextField } from "..";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { SearchProducts } from "../../core/types/saleor";
import { debounce } from "../../core/utils";
import { Error } from "../Error";
import NetworkStatus from "../NetworkStatus";
import { OfflinePlaceholder } from "../OfflinePlaceholder";
import { GET_SEARCH_PRODUCTS } from "./queries";

import "./scss/index.scss";

interface AttributesType {
  [x: string]: string[];
}

const canDisplay = (data: SearchProducts) =>
  data &&
  data.attributes &&
  data.attributes.edges !== undefined &&
  data.products &&
  data.products.edges !== undefined &&
  data.products.totalCount !== undefined;

class SearchPage extends React.Component<
  RouteComponentProps<{}>,
  {
    attributes: AttributesType;
    pageSize: number;
    sortBy: string;
    priceGte: number;
    priceLte: number;
  }
> {
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

  onFieldChange = value => {
    if (value) {
      this.props.history.push({ pathname: "/search", search: `?q=${value}` });
      this.setState({
        attributes: {},
        pageSize: PRODUCTS_PER_PAGE,
        sortBy: ""
      });
    }
  };

  convertToAttributeScalar = (attributes: AttributesType) => {
    const attributesArray = [];
    Object.entries(attributes).forEach(([key, value]) => {
      value.forEach(attribute =>
        attributesArray.push(
          `${key.toLowerCase().replace(" ", "-")}:${attribute.toLowerCase()}`
        )
      );
    });
    return attributesArray;
  };

  render() {
    return (
      <div className="search-page">
        <div className="search-page__header">
          <div className="search-page__header__input container">
            <TextField
              label="Search term:"
              defaultValue={parse(this.props.location.search).q}
              onChange={e => {
                e.persist();
                debounce(this.onFieldChange(e.target.value), 1000);
              }}
            />
          </div>
        </div>
        <NetworkStatus>
          {isOnline => (
            <Query
              query={GET_SEARCH_PRODUCTS}
              variables={{
                ...this.state,
                attributes: this.convertToAttributeScalar(
                  this.state.attributes
                ),
                query: parse(this.props.location.search).q
              }}
              fetchPolicy="cache-and-network"
              errorPolicy="all"
            >
              {({ error, data, loading }) => {
                if (canDisplay(data)) {
                  return (
                    <ProductsList
                      products={data.products}
                      loading={loading}
                      attributes={data.attributes.edges.map(edge => edge.node)}
                      filters={this.state}
                      onFiltersChange={this.onFiltersChange}
                      searchQuery={parse(this.props.location.search).q}
                    />
                  );
                }
                if (error) {
                  if (!isOnline) {
                    return <OfflinePlaceholder />;
                  }
                  return <Error error={error.message} />;
                }
                return <Loader full />;
              }}
            </Query>
          )}
        </NetworkStatus>
      </div>
    );
  }
}

export default withRouter(SearchPage);
