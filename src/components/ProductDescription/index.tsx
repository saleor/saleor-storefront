import "./scss/index.scss";

import * as React from "react";

import { TextField } from "@components/molecules";
import { ProductVariantPicker } from "@components/organisms";
import {
  ProductDetails_product_attributes,
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@sdk/queries/types/ProductDetails";
import { IProductVariantsAttributesSelectedValues, ITaxedMoney } from "@types";

import { CartContext, CartLine } from "../CartProvider/context";
import AddToCart from "./AddToCart";
import { TaxedMoney } from "../../@next/components/containers";

interface ProductDescriptionProps {
  productVariants: ProductDetails_product_variants[];
  selectedAttributes: ProductDetails_product_attributes[];
  name: string;
  pricing: ProductDetails_product_pricing;
  children: React.ReactNode;
  addToCart(varinatId: string, quantity?: number): void;
}

interface ProductDescriptionState {
  quantity: number;
  variant: string;
  variantStock: number;
  variantPricing: ProductDetails_product_variants_pricing;
  variantPricingRange: {
    min: ITaxedMoney;
    max: ITaxedMoney;
  };
}

class ProductDescription extends React.Component<
  ProductDescriptionProps,
  ProductDescriptionState
> {
  constructor(props: ProductDescriptionProps) {
    super(props);

    this.state = {
      variantPricingRange: {
        min: props.pricing.priceRange.start,
        max: props.pricing.priceRange.stop,
      },
      quantity: 1,
      variant: "",
      variantPricing: null,
      variantStock: null,
    };
  }

  getProductPrice = () => {
    const { variantPricingRange, variantPricing } = this.state;

    const { min, max } = variantPricingRange;
    if (variantPricing) {
      return (
        <h4>
          <TaxedMoney taxedMoney={variantPricing.price} />
        </h4>
      );
    }
    if (min === max) {
      return <TaxedMoney taxedMoney={min} />;
    } else {
      return (
        <span>
          <TaxedMoney taxedMoney={min} /> - <TaxedMoney taxedMoney={max} />
        </span>
      );
    }
  };

  onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ) => {
    if (selectedVariant) {
      this.setState({
        variant: selectedVariant.id,
        variantPricing: selectedVariant.pricing,
        variantStock: selectedVariant.stockQuantity,
      });
    } else {
      this.setState({ variant: "", variantPricing: null });
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
    const { quantity } = this.state;

    return (
      <div className="product-description">
        <h3>{name}</h3>
        <h4>{this.getProductPrice()}</h4>
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
            selectSidebar={true}
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
