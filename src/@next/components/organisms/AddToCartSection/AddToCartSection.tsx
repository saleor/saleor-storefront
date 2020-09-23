import React, { useState } from "react";
import { useIntl } from "react-intl";

import { ProductVariantPicker } from "@components/organisms";
import { commonMessages } from "@temp/intl";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";

import * as S from "./styles";
import {
  getAvailableQuantity,
  getProductPrice,
  canAddToCart,
} from "./stockHelpers";
import QuantityInput from "../../molecules/QuantityInput";
import AddToCartButton from "../../molecules/AddToCartButton";
import { IProductVariantsAttributesSelectedValues } from "../../../types";

const LOW_STOCK_QUANTITY: number = 5;

export interface IAddToCartSection {
  productId: string;
  productVariants: ProductDetails_product_variants[];
  name: string;
  productPricing: ProductDetails_product_pricing;
  items: ICheckoutModelLine[];
  queryAttributes: Record<string, string>;
  isAvailableForPurchase: boolean | null;
  availableForPurchase: string | null;
  setVariantId(variantId: string): void;
  onAddToCart(variantId: string, quantity?: number): void;
  onAttributeChangeHandler(slug: string | null, value: string): void;
}

export const AddToCartSection: React.FC<IAddToCartSection> = props => {
  const { isAvailableForPurchase, availableForPurchase } = props;
  const intl = useIntl();

  const [quantity, setQuantity] = useState<number>(1);
  const [variantId, setVariantId] = useState<string>("");
  const [variantStock, setVariantStock] = useState<number>(0); // TODO: check if we can use 0 instead of null
  const [
    variantPricing,
    setVariantPricing,
  ] = useState<ProductDetails_product_variants_pricing | null>(null);

  const availableQuantity = getAvailableQuantity(
    props.items,
    variantId,
    variantStock
  );
  const isOutOfStock = !!variantId && variantStock === 0;
  const noPurchaseAvailable = !isAvailableForPurchase && !availableForPurchase;
  const purchaseAvailableDate =
    !isAvailableForPurchase &&
    availableForPurchase &&
    Date.parse(availableForPurchase);
  const isNoItemsAvailable = !!variantId && !isOutOfStock && !availableQuantity;
  const isLowStock =
    !!variantId &&
    !isOutOfStock &&
    !isNoItemsAvailable &&
    availableQuantity < LOW_STOCK_QUANTITY;

  const disableButton = canAddToCart(
    props.items,
    !!isAvailableForPurchase,
    variantId,
    variantStock,
    quantity
  );

  const renderErrorMessage = (message: string) => (
    <S.ErrorMessage>{message}</S.ErrorMessage>
  );

  const onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ): undefined => {
    if (!selectedVariant) {
      setVariantId("");
      setVariantPricing(null);
      setVariantStock(0);
      return;
    }
    setVariantId(selectedVariant.id);
    setVariantPricing(selectedVariant?.pricing);
    setVariantStock(selectedVariant?.quantityAvailable);
  };

  return (
    <S.AddToCartSelection>
      <S.ProductNameHeader>{props.name}</S.ProductNameHeader>
      {isOutOfStock ? (
        renderErrorMessage(intl.formatMessage(commonMessages.outOfStock))
      ) : (
        <S.ProductPricing>
          {getProductPrice(props.productPricing, variantPricing)}
        </S.ProductPricing>
      )}
      {noPurchaseAvailable &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.noPurchaseAvailable)
        )}
      {purchaseAvailableDate &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.purchaseAvailableOn, {
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
        renderErrorMessage(intl.formatMessage(commonMessages.lowStock))}
      {isNoItemsAvailable &&
        renderErrorMessage(intl.formatMessage(commonMessages.noItemsAvailable))}
      <S.VariantPicker>
        <ProductVariantPicker
          productVariants={props.productVariants}
          onChange={onVariantPickerChange}
          selectSidebar
          queryAttributes={props.queryAttributes}
          onAttributeChangeHandler={props.onAttributeChangeHandler}
        />
      </S.VariantPicker>
      <S.QuantityInput>
        <QuantityInput
          quantity={quantity}
          maxQuantity={availableQuantity}
          disabled={isOutOfStock || isNoItemsAvailable}
          onQuantityChange={setQuantity}
          hideErrors={!variantId || isOutOfStock || isNoItemsAvailable}
        />
      </S.QuantityInput>
      <AddToCartButton
        onSubmit={() => props.onAddToCart(variantId, quantity)}
        disabled={disableButton}
      />
    </S.AddToCartSelection>
  );
};
AddToCartSection.displayName = "AddToCartSection";
export default AddToCartSection;
