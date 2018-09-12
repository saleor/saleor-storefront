import * as React from "react";

import {
  ProductDetailsInterface,
  ProductVariantInterface
} from "../../core/types";
import { CartContext } from "../Cart/context";

import "./scss/index.scss";

interface ProductVariantFormProps {
  productVariants: ProductVariantInterface[];
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

interface ProductDescriptionInterface {
  product: ProductDetailsInterface;
  locale?: string;
}

const ProductDescription: React.SFC<ProductDescriptionInterface> = ({
  product: { name, price, description, variants },
  locale
}) => (
  <div className="product-description">
    <h3>{name}</h3>
    <h4>
      {locale
        ? price.amount.toLocaleString(locale, {
            currency: price.currency,
            style: "currency"
          })
        : `${price.currency} ${price.amount}`}
    </h4>
    <div className="product-description__about">
      <h4>Description</h4>
      <p>{description}</p>
    </div>
    <CartContext.Consumer>
      {cart => (
        <ProductVariantForm
          onProductVariantSelect={variant => cart.add(variant.id)}
          productVariants={variants.edges.map(edge => edge.node)}
        />
      )}
    </CartContext.Consumer>
  </div>
);

export default ProductDescription;
