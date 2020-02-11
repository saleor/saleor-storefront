import "./scss/index.scss";

import isEqual from "lodash/isEqual";
import * as React from "react";

import { TextField } from "@components/molecules";
import { ProductVariantPicker } from "@components/organisms";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@sdk/queries/types/ProductDetails";
import { IProductVariantsAttributesSelectedValues, ITaxedMoney } from "@types";

import { TaxedMoney } from "../../@next/components/containers";
import { CartContext, CartLine } from "../CartProvider/context";
import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";

interface ProductDescriptionProps {
  productId: string;
  productVariants: ProductDetails_product_variants[];
  name: string;
  pricing: ProductDetails_product_pricing;
  addToCart(varinatId: string, quantity?: number): void;
  setVariantId(variantId: string);
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
      quantity: 1,
      variant: "",
      variantPricing: null,
      variantPricingRange: {
        max: props.pricing.priceRange.stop,
        min: props.pricing.priceRange.start,
      },
      variantStock: null,
    };
  }

  getProductPrice = () => {
    const { variantPricingRange, variantPricing } = this.state;

    const { min, max } = variantPricingRange;
    if (variantPricing) {
      if (isEqual(variantPricing.priceUndiscounted, variantPricing.price)) {
        return <TaxedMoney taxedMoney={variantPricing.price} />;
      } else {
        return (
          <>
            <span className="product-description__undiscounted_price">
              <TaxedMoney taxedMoney={variantPricing.priceUndiscounted} />
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <TaxedMoney taxedMoney={variantPricing.price} />
          </>
        );
      }
    }
    if (isEqual(min, max)) {
      return <TaxedMoney taxedMoney={min} />;
    } else {
      return (
        <>
          <TaxedMoney taxedMoney={min} /> - <TaxedMoney taxedMoney={max} />
        </>
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
      this.props.setVariantId(selectedVariant.id);
    } else {
      this.setState({ variant: "", variantPricing: null });
      this.props.setVariantId("");
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
    const { name } = this.props;
    const { quantity } = this.state;

    return (
      <div className="product-description">
        <h3>{name}</h3>
        <h4>{this.getProductPrice()}</h4>
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
        <CartContext.Consumer>
          {({ lines }) => (
            <AddToCart
              onSubmit={this.handleSubmit}
              lines={lines}
              disabled={!this.canAddToCart(lines)}
            />
          )}
        </CartContext.Consumer>
        <div className="product-description__add-to-wishlist">
          <AddToWishlist productId={this.props.productId} />
        </div>
      </div>
    );
  }
}

export default ProductDescription;
