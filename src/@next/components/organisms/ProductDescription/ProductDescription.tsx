import React from "react";

import { TextField } from "@components/molecules";
import { ProductVariantPicker } from "@components/organisms";
import {
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@sdk/queries/types/ProductDetails";
import { IProductVariantsAttributesSelectedValues } from "@temp/@next/types/IProductVariantsAttributes";

import { CartContext } from "../../../../components/CartProvider/context";
import AddToCart from "../../../../components/ProductDescription/AddToCart";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductDescription: React.FC<IProps> = ({
  productVariants,
  selectedAttributes,
  name,
  children,
  addToCart,
}: IProps) => {
  const [
    pricing,
    setPricing,
  ] = React.useState<ProductDetails_product_variants_pricing | null>(
    productVariants[0].pricing
  );
  const [quantity, setQuantity] = React.useState(1);
  const [variantStock, setVariantStock] = React.useState(0);
  const [variant, setVariant] = React.useState("");

  const cartContext = React.useContext(CartContext);

  const onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ) => {
    if (selectedVariant) {
      setPricing(selectedVariant.pricing);
      setVariant(selectedVariant.id);
      setVariantStock(selectedVariant.stockQuantity);
    } else {
      setVariant("");
    }
  };

  const handleSubmit = () => {
    addToCart(variant, quantity);
  };

  const canAddToCart = () => {
    const cartLine = cartContext.lines.find(
      ({ variantId }) => variantId === variant
    );
    const syncedQuantityWithCart = cartLine
      ? quantity + cartLine.quantity
      : quantity;
    return quantity !== 0 && variant && variantStock >= syncedQuantityWithCart;
  };

  return (
    <S.Wrapper>
      <S.ProductName>{name}</S.ProductName>
      <S.ProductPrice>{pricing!.price!.gross.localized}</S.ProductPrice>
      <div>
        {selectedAttributes.map(
          ({ attribute, values }) =>
            values.length > 0 && (
              <S.ProductAttribute key={attribute.id}>
                <span>{`${attribute.name}: `}</span>
                <span>{values.map(value => value!.name).join(", ")}</span>
              </S.ProductAttribute>
            )
        )}
      </div>
      <S.ProductVariantAttributeList>
        <ProductVariantPicker
          productVariants={productVariants}
          onChange={onVariantPickerChange}
        />
      </S.ProductVariantAttributeList>
      <S.ProductQuantity>
        <TextField
          type="number"
          label="Quantity"
          min="1"
          value={quantity || ""}
          onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
        />
      </S.ProductQuantity>
      <S.ProductDescription>
        <h4>Description</h4>
        {children}
      </S.ProductDescription>
      <AddToCart
        onSubmit={handleSubmit}
        lines={cartContext.lines}
        disabled={!canAddToCart()}
      />
    </S.Wrapper>
  );
};
