import * as debounce from "lodash.debounce";
import { parse } from "query-string";
import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";

import { Loader, ProductsList, TextField } from "..";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { GET_SEARCH_PRODUCTS } from "./queries";

import "./scss/index.scss";

interface AttributesType {
  [x: string]: string[];
}

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
  onFieldChangeDebounced: (value: string) => void;
  constructor(props) {
    super(props);
    this.onFieldChangeDebounced = debounce(this.onFieldChange, 1000);
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
                this.onFieldChangeDebounced(e.target.value);
              }}
            />
          </div>
        </div>
        <Query
          query={GET_SEARCH_PRODUCTS}
          variables={{
            ...this.state,
            attributes: this.convertToAttributeScalar(this.state.attributes),
            query: parse(this.props.location.search).q
          }}
        >
          {({ loading, error, data }) => {
            if (
              loading &&
              Object.keys(this.state.attributes).length === 0 &&
              !this.state.sortBy
            ) {
              return <Loader full />;
            }
            if (error) {
              return `Error!: ${error}`;
            }
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
          }}
        </Query>
      </div>
    );
  }
}

export default withRouter(SearchPage);
