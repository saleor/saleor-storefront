import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { Breadcrumbs, Loader, ProductsList } from "..";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { Category } from "../../core/types/saleor";
import {
  getDBIdFromGraphqlId,
  getGraphqlIdFromDBId,
  slugify
} from "../../core/utils";
import NetworkStatus from "../NetworkStatus";
import { Offline } from "../Offline";
import { GET_CATEGORY_AND_ATTRIBUTES } from "./queries";

import "./scss/index.scss";

interface AttributesType {
  [x: string]: string[];
}

const canDisplay = (data: Category) =>
  data &&
  data.attributes &&
  data.attributes.edges &&
  data.products &&
  data.products.edges &&
  data.products.totalCount &&
  data.category &&
  data.category.name;

class CategoryPage extends React.Component<
  RouteComponentProps<{ id }>,
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

  formatBreadcrumbs = category => {
    let breadcrumbs = [
      {
        link: `/category/${slugify(category.name)}/${getDBIdFromGraphqlId(
          category.id,
          "Category"
        )}/`,
        value: category.name
      }
    ];
    if (category.ancestors.edges.length > 0) {
      const ancestorsList = category.ancestors.edges.map(
        ({ node: ancestor }) => ({
          link: `/category/${slugify(ancestor.name)}/${getDBIdFromGraphqlId(
            ancestor.id,
            "Category"
          )}/`,
          value: ancestor.name
        })
      );
      breadcrumbs = ancestorsList.concat(breadcrumbs);
    }
    return breadcrumbs;
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
          >
            {({ loading, error, data }) => {
              if (canDisplay(data)) {
                return (
                  <div className="category">
                    <div
                      className="category__header"
                      style={
                        data.category.backgroundImage
                          ? {
                              backgroundImage: `url(${
                                data.category.backgroundImage.url
                              })`
                            }
                          : undefined
                      }
                    >
                      <span className="category__header__title">
                        <h1>{data.category.name}</h1>
                      </span>
                    </div>
                    <div className="container">
                      <Breadcrumbs
                        breadcrumbs={this.formatBreadcrumbs(data.category)}
                      />
                    </div>
                    <ProductsList
                      products={data.products}
                      loading={loading}
                      filters={this.state}
                      attributes={data.attributes.edges.map(edge => edge.node)}
                      onFiltersChange={this.onFiltersChange}
                    />
                  </div>
                );
              }
              if (!isOnline) {
                return <Offline />;
              }
              if (error && !data) {
                return <>{`Error!: ${error}`}</>;
              }
              return <Loader full />;
            }}
          </Query>
        )}
      </NetworkStatus>
    );
  }
}

export default CategoryPage;
