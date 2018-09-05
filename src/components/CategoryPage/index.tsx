import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { ProductListItem, SelectField } from "..";
import { getGraphqlIdFromDBId } from "../../core/utils";
import { GET_CATEGORY_AND_ATTRIBUTES } from "./queries";

import "./scss/index.scss";

interface AttributesType {
  [x: string]: string[];
}
class CategoryPage extends React.Component<
  RouteComponentProps<{ id }>,
  { attributes: AttributesType }
> {
  constructor(props) {
    super(props);
    this.state = { attributes: {} };
  }

  saveAttribute = (attribute, values) => {
    this.setState({
      attributes: {
        ...this.state.attributes,
        [attribute]: values.map(value => value.value)
      }
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

  render() {
    return (
      <Query
        query={GET_CATEGORY_AND_ATTRIBUTES}
        variables={{
          attributes: this.convertToAttributeScalar(this.state.attributes),
          id: getGraphqlIdFromDBId(this.props.match.params.id, "Category")
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
                  backgroundImage: `url(http://localhost:8000/media/${
                    data.category.backgroundImage
                  })`
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
                      <SelectField
                        key={item.node.id}
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
                    ))}
                  </div>
                </div>
              </div>
              <div className="category__products container">
                {loading && Object.keys(this.state.attributes).length > 0 ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <p className="category__products__total">
                      {data.category.products.totalCount} Products
                    </p>
                    <div className="category__products__grid">
                      {data.category.products.edges.map(item => (
                        <ProductListItem
                          product={item.node}
                          key={item.node.id}
                        />
                      ))}
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
