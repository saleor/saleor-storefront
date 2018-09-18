import { parse } from "query-string";
import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { ProductsList, TextField } from "..";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { GET_SEARCH_PRODUCTS } from "./queries";

import "./scss/index.scss";

class SearchPage extends React.Component<
  RouteComponentProps<{}>,
  { attributes: string[]; pageSize: number; sortBy: string }
> {
  constructor(props) {
    super(props);
    this.state = { attributes: [], pageSize: PRODUCTS_PER_PAGE, sortBy: "" };
  }

  onFltersChange = filters => {
    this.setState(filters);
  };

  render() {
    return (
      <Query
        query={GET_SEARCH_PRODUCTS}
        variables={{
          ...this.state,
          query: parse(this.props.location.search).q
        }}
      >
        {({ loading, error, data }) => {
          if (
            loading &&
            Object.keys(this.state.attributes).length === 0 &&
            !this.state.sortBy
          ) {
            return "Loading";
          }
          if (error) {
            return `Error!: ${error}`;
          }
          return (
            <div className="search-page">
              <div className="search-page__header">
                <div className="search-page__header__input container">
                  <TextField
                    label="Search term:"
                    defaultValue={parse(this.props.location.search).q}
                  />
                </div>
              </div>
              <ProductsList
                products={data.products}
                loading
                attributes={data.attributes.edges.map(edge => edge.node)}
                onFltersChange={this.onFltersChange}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default SearchPage;
