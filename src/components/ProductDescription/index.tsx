import "./scss/index.scss";

import isEqual from "lodash/isEqual";
import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { ProductVariantPicker } from "@components/organisms";
import { commonMessages } from "@temp/intl";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
import { IProductVariantsAttributesSelectedValues, ITaxedMoney } from "@types";

import { TaxedMoney } from "../../@next/components/containers";
import AddToCartButton from "../../@next/components/molecules/AddToCartButton";
import QuantityInput from "../../@next/components/molecules/QuantityInput";
import { OverlayType, OverlayTheme, OverlayContext } from "../Overlay";

const LOW_STOCK_QUANTITY = 5;
interface ProductDescriptionProps extends WrappedComponentProps {
  productId: string;
  productVariants: ProductDetails_product_variants[];
  name: string;
  pricing: ProductDetails_product_pricing;
  items: ICheckoutModelLine[];
  queryAttributes: Record<string, string>;
  isAvailableForPurchase: boolean | null;
  availableForPurchase: string | null;
  setVariantId(variantId: string): void;
  onAddToCart(variantId: string, quantity?: number): void;
  onAttributeChangeHandler(slug: string | null, value: string): void;
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
        max: props.pricing.priceRange?.stop,
        min: props.pricing.priceRange?.start,
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
      }
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
    if (isEqual(min, max)) {
      return <TaxedMoney taxedMoney={min} />;
    }
    return (
      <>
        <TaxedMoney taxedMoney={min} /> - <TaxedMoney taxedMoney={max} />
      </>
    );
  };

  onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ) => {
    if (selectedVariant) {
      this.setState({
        variant: selectedVariant.id,
        variantPricing: selectedVariant.pricing,
        variantStock: selectedVariant.quantityAvailable,
      });
      this.props.setVariantId(selectedVariant.id);
    } else {
      this.setState({ variant: "", variantPricing: null });
      this.props.setVariantId("");
    }
  };

  canAddToCart = () => {
    const { items, isAvailableForPurchase } = this.props;
    const { variant, quantity, variantStock } = this.state;

    const cartItem = items?.find(item => item.variant.id === variant);
    const syncedQuantityWithCart = cartItem
      ? quantity + (cartItem?.quantity || 0)
      : quantity;
    return (
      isAvailableForPurchase &&
      quantity > 0 &&
      variant &&
      variantStock >= syncedQuantityWithCart
    );
  };

  getAvailableQuantity = () => {
    const { items } = this.props;
    const { variant, variantStock } = this.state;

    const cartItem = items?.find(item => item.variant.id === variant);
    const quantityInCart = cartItem?.quantity || 0;
    return variantStock - quantityInCart;
  };

  handleQuantityChange = (quantity: number) => {
    this.setState({
      quantity,
    });
  };

  renderErrorMessage = (message: string) => (
    <p className="product-description__error-message">{message}</p>
  );

  render() {
    const { name, isAvailableForPurchase, availableForPurchase } = this.props;
    const { variant, variantStock, quantity } = this.state;

    const availableQuantity = this.getAvailableQuantity();
    const isOutOfStock = !!variant && variantStock === 0;
    const noPurchaseAvailable =
      !isAvailableForPurchase && !availableForPurchase;
    const purchaseAvailableDate =
      !isAvailableForPurchase &&
      availableForPurchase &&
      Date.parse(availableForPurchase);
    const isNoItemsAvailable = !!variant && !isOutOfStock && !availableQuantity;
    const isLowStock =
      !!variant &&
      !isOutOfStock &&
      !isNoItemsAvailable &&
      availableQuantity < LOW_STOCK_QUANTITY;

    return (
      <div className="product-description">
        <h3>{name}</h3>
        {isOutOfStock ? (
          this.renderErrorMessage(
            this.props.intl.formatMessage(commonMessages.outOfStock)
          )
        ) : (
          <h4>{this.getProductPrice()}</h4>
        )}
        {noPurchaseAvailable &&
          this.renderErrorMessage(
            this.props.intl.formatMessage(commonMessages.noPurchaseAvailable)
          )}
        {purchaseAvailableDate &&
          this.renderErrorMessage(
            this.props.intl.formatMessage(commonMessages.purchaseAvailableOn, {
              date: new Intl.DateTimeFormat("default", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }).format(purchaseAvailableDate),
              time: new Intl.DateTimeFormat("default", {
                hour: "numeric",
                minute: "numeric",
              }).format(purchaseAvailableDate),
            })
          )}
        {isLowStock &&
          this.renderErrorMessage(
            this.props.intl.formatMessage(commonMessages.lowStock)
          )}
        {isNoItemsAvailable &&
          this.renderErrorMessage(
            this.props.intl.formatMessage(commonMessages.noItemsAvailable)
          )}
        <div className="product-description__variant-picker">
          <ProductVariantPicker
            productVariants={this.props.productVariants}
            onChange={this.onVariantPickerChange}
            selectSidebar
            queryAttributes={this.props.queryAttributes}
            onAttributeChangeHandler={this.props.onAttributeChangeHandler}
          />
        </div>
        <div className="product-description__quantity-input">
          <QuantityInput
            quantity={quantity}
            maxQuantity={availableQuantity}
            disabled={isOutOfStock || isNoItemsAvailable}
            onQuantityChange={this.handleQuantityChange}
            hideErrors={!variant || isOutOfStock || isNoItemsAvailable}
          />
        </div>
        <OverlayContext.Consumer>
          {overlayContext => (
            <AddToCartButton
              onSubmit={() => {
                this.props.onAddToCart(this.state.variant, this.state.quantity);
                overlayContext.show(OverlayType.cart, OverlayTheme.right);
              }}
              disabled={!this.canAddToCart()}
            />
          )}
        </OverlayContext.Consumer>
      </div>
    );
  }
}

export default injectIntl(ProductDescription);
