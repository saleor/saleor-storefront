import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { getGraphqlIdFromDBId } from "../../core/utils";
import { GET_PRODUCT_DETAILS } from "./queries";

import Button from "../Button";
import { CartContext, CartInterface } from "../Cart/context";

import { ProductVariantInterface } from "../../core/types";

import "./scss/index.scss";

interface ProductVariantFormProps {
  productVariants: [ProductVariantInterface?];
  onProductVariantSelect(variant: ProductVariantInterface): void;
}

class ProductVariantForm extends React.Component<ProductVariantFormProps> {
  state = {
    variant: null
  };

  handleSubmit = event => {
    if (this.state.variant) {
      this.props.onProductVariantSelect(this.state.variant);
    }
    event.preventDefault();
  };

  handleChange = event => {
    const variantId = event.target.value;
    const variant =
      this.props.productVariants.find(v => v.id === variantId) || null;
    this.setState({ variant });
  };

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <select onChange={this.handleChange}>
        <option value="">Select Variant</option>
        {this.props.productVariants.map(variant => (
          <option key={variant.id} value={variant.id}>
            {variant.name}
          </option>
        ))}
      </select>
      <input type="submit" value="Add to cart" />
    </form>
  );
}

const ProductPage: React.SFC<RouteComponentProps<{ id; slug }>> = ({
  match: {
    params: { id = "" }
  }
}) => (
  <Query
    query={GET_PRODUCT_DETAILS}
    variables={{ id: getGraphqlIdFromDBId(id, "Product") }}
  >
    {({ loading, error, data: { product } }) => {
      if (loading) {
        return "Loading";
      }
      if (error) {
        return `Error!: ${error}`;
      }
      return (
        <>
          <h2>{product.name}</h2>
          <p>
            <img src={product.thumbnailUrl} alt={product.name} />
            {product.description}
          </p>
          <CartContext.Consumer>
            {cart => (
              <ProductVariantForm
                onProductVariantSelect={variant => cart.add(variant.id)}
                productVariants={product.variants.edges.map(edge => edge.node)}
              />
            )}
          </CartContext.Consumer>
        </>
      );
    }}
  </Query>
);

export default ProductPage;
