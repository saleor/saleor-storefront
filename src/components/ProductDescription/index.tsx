import "./scss/index.scss";

import * as React from "react";

import { TextField } from "@components/molecules";
import { ProductVariantPicker } from "@components/organisms";
import {
  ProductDetails_product_attributes,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@sdk/queries/types/ProductDetails";
import { IProductVariantsAttributesSelectedValues } from "@types";

import { CartContext, CartLine } from "../CartProvider/context";
import AddToCart from "./AddToCart";

interface ProductDescriptionProps {
  productVariants: ProductDetails_product_variants[];
  selectedAttributes: ProductDetails_product_attributes[];
  name: string;
  children: React.ReactNode;
  addToCart(varinatId: string, quantity?: number): void;
}

interface ProductDescriptionState {
  quantity: number;
  variant: string;
  variantStock: number;
  pricing: ProductDetails_product_variants_pricing;
}

class ProductDescription extends React.Component<
  ProductDescriptionProps,
  ProductDescriptionState
> {
  constructor(props: ProductDescriptionProps) {
    super(props);
    this.state = {
      pricing: this.props.productVariants[0].pricing,
      quantity: 1,
      variant: "",
      variantStock: null,
    };
  }

  onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ) => {
    if (selectedVariant) {
      this.setState({
        pricing: selectedVariant.pricing,
        variant: selectedVariant.id,
        variantStock: selectedVariant.stockQuantity,
      });
    } else {
      this.setState({ variant: "" });
    }
  };

  handleSubmit = () => {
    this.props.addToCart(this.state.variant, this.state.quantity);
  };

  canAddToCart = (lines: CartLine[]) => {
    const { variant, quantity, variantStock } = this.state;
    const cartLine = lines.find(({ variantId }) => variantId === variant);
    const syncedQuantityWithCart = cartLine
      ? quantity + cartLine.quantity
      : quantity;
    return quantity !== 0 && variant && variantStock >= syncedQuantityWithCart;
  };

  render() {
    const { children, name, selectedAttributes } = this.props;
    const { pricing, quantity } = this.state;

    return (
      <div className="product-description">
        <h3>{name}</h3>
        <h4>{pricing.price.gross.localized}</h4>
        <div>
          {selectedAttributes.map(
            ({ attribute, values }) =>
              values.length > 0 && (
                <div
                  className="product-description__selected-attributes"
                  key={attribute.id}
                >
                  <span>{`${attribute.name}: `}</span>
                  <span>{values.map(({ name }) => name).join(", ")}</span>
                </div>
              )
          )}
        </div>
        <div className="product-description__variant-picker">
          <ProductVariantPicker
            productVariants={this.props.productVariants}
            onChange={this.onVariantPickerChange}
          />
        </div>
        <div className="product-description__quantity-input">
          <TextField
            type="number"
            label="Quantity"
            min="1"
            value={quantity || ""}
            onChange={e =>
              this.setState({ quantity: Math.max(1, Number(e.target.value)) })
            }
          />
        </div>
        <div className="product-description__about">
          <h4>Description</h4>
          {children}
        </div>
        <CartContext.Consumer>
          {({ lines }) => (
            <AddToCart
              onSubmit={this.handleSubmit}
              lines={lines}
              disabled={!this.canAddToCart(lines)}
            />
          )}
        </CartContext.Consumer>
      </div>
    );
  }
}

export default ProductDescription;
