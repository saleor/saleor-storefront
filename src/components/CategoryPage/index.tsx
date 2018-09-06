import * as React from "react";
import { Query } from "react-apollo";
import Media from "react-media";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { Button, ProductListItem, SelectField } from "..";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import {
  getDBIdFromGraphqlId,
  getGraphqlIdFromDBId,
  slugify
} from "../../core/utils";
import { smallScreen } from "../App/scss/variables.scss";
import { GET_CATEGORY_AND_ATTRIBUTES } from "./queries";

import "./scss/index.scss";

interface AttributesType {
  [x: string]: string[];
}
class CategoryPage extends React.Component<
  RouteComponentProps<{ id }>,
  { attributes: AttributesType; pageSize: number }
> {
  constructor(props) {
    super(props);
    this.state = { attributes: {}, pageSize: PRODUCTS_PER_PAGE };
  }

  saveAttribute = (attribute, values) => {
    this.setState({
      attributes: {
        ...this.state.attributes,
        [attribute]: values.map(value => value.value)
      },
      pageSize: PRODUCTS_PER_PAGE
    });
  };

  convertToAttributeScalar = (attributes: AttributesType) => {
    const attributesArray = [];
    Object.entries(attributes).map(([key, value]) => {
      value.map(value =>
        attributesArray.push(`${key.toLowerCase()}:${value.toLowerCase()}`)
      );
    });
    return attributesArray;
  };

  loadMoreProducts = () => {
    this.setState({
      pageSize: this.state.pageSize + PRODUCTS_PER_PAGE
    });
  };

  render() {
    return (
      <Query
        query={GET_CATEGORY_AND_ATTRIBUTES}
        variables={{
          attributes: this.convertToAttributeScalar(this.state.attributes),
          id: getGraphqlIdFromDBId(this.props.match.params.id, "Category"),
          pageSize: this.state.pageSize
        }}
      >
        {({ loading, error, data }) => {
          if (loading && Object.keys(this.state.attributes).length === 0) {
            return "Loading";
          }
          if (error) {
            return `Error!: ${error}`;
          }
          return (
            <div className="category">
              <div
                className="category__header"
                style={{
                  backgroundImage: data.category.backgroundImage
                }}
              >
                <span className="category__header__title">
                  <h1>{data.category.name}</h1>
                </span>
              </div>
              <div className="category__filters">
                <div className="container">
                  <div className="category__filters__grid">
                    {data.attributes.edges.map(item => (
                      <div
                        key={item.node.id}
                        className="category__filters__grid__filter"
                      >
                        <SelectField
                          placeholder={item.node.name}
                          options={item.node.values.map(value => ({
                            label: value.name,
                            value: value.name
                          }))}
                          isMulti
                          onChange={values =>
                            this.saveAttribute(item.node.name, values)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="category__products container">
                {loading &&
                Object.keys(this.state.attributes).length > 0 &&
                this.state.pageSize > PRODUCTS_PER_PAGE ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <p className="category__products__total">
                      {data.category.products.totalCount} Products
                    </p>
                    <div className="category__products__grid">
                      {data.category.products.edges.map(({ node: product }) => (
                        <Link
                          to={`/product/${slugify(
                            product.name
                          )}/${getDBIdFromGraphqlId(product.id, "Product")}/`}
                          key={product.id}
                        >
                          <ProductListItem product={product} />
                        </Link>
                      ))}
                    </div>
                    <div className="category__products__load-more">
                      {loading && this.state.pageSize > PRODUCTS_PER_PAGE ? (
                        <p>Loading...</p>
                      ) : this.state.pageSize >=
                      data.category.products.totalCount ? null : (
                        <Media query={{ maxWidth: smallScreen }}>
                          {matches =>
                            matches ? (
                              <Button secondary onClick={this.loadMoreProducts}>
                                Load more products
                              </Button>
                            ) : (
                              <Button secondary onClick={this.loadMoreProducts}>
                                Load more products (
                                {`${
                                  this.state.pageSize + PRODUCTS_PER_PAGE >
                                  data.category.products.totalCount
                                    ? data.category.products.totalCount
                                    : this.state.pageSize + PRODUCTS_PER_PAGE
                                } of 
                              ${data.category.products.totalCount}`}
                                )
                              </Button>
                            )
                          }
                        </Media>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CategoryPage;
