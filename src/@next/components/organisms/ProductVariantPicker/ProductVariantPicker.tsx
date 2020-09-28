import React, { useEffect } from "react";

import {
  useProductVariantsAttributes,
  useProductVariantsAttributesValuesSelection,
} from "@hooks";
import { ProductDetails_product_variants } from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
import { IProductVariantsAttributesSelectedValues } from "@types";
import { ProductVariantAttributeSelect } from "./ProductVariantAttributeSelect";
import * as S from "./styles";

export interface IProductVariantPickerProps {
  productVariants?: ProductDetails_product_variants[];
  onChange?: (
    selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants | undefined
  ) => void;
  selectSidebar?: boolean;
  selectSidebarTarget?: HTMLElement | null;
  queryAttributes: Record<string, string>;
  onAttributeChangeHandler: (slug: string | null, value: string) => void;
}

const ProductVariantPicker: React.FC<IProductVariantPickerProps> = ({
  productVariants = [],
  queryAttributes = {},
  onAttributeChangeHandler,
  onChange,
  selectSidebar = false,
  selectSidebarTarget,
}) => {
  const productVariantsAttributes = useProductVariantsAttributes(
    productVariants
  );
  const [
    productVariantsAttributesSelectedValues,
    selectProductVariantsAttributesValue,
  ] = useProductVariantsAttributesValuesSelection(productVariantsAttributes);

  useEffect(() => {
    const selectedVariant = productVariants.find(productVariant => {
      return productVariant.attributes.every(productVariantAttribute => {
        const productVariantAttributeId = productVariantAttribute.attribute.id;
        if (
          productVariantAttribute.values[0] &&
          productVariantsAttributesSelectedValues[productVariantAttributeId] &&
          productVariantAttribute.values[0]!.id ===
            productVariantsAttributesSelectedValues[productVariantAttributeId]!
              .id
        ) {
          return true;
        }
        return false;
      });
    });
    if (onChange) {
      onChange(productVariantsAttributesSelectedValues, selectedVariant);
    }
  }, [productVariantsAttributesSelectedValues]);

  const onAttributeChange = (id: string, value: any, slug: string | null) => {
    selectProductVariantsAttributesValue(id, value);
    onAttributeChangeHandler(slug, value);
  };

  return (
    <S.Wrapper>
      {Object.keys(productVariantsAttributes).map(
        productVariantsAttributeId => {
          const productVariantsAttribute =
            productVariantsAttributes[productVariantsAttributeId];
          const { slug } = productVariantsAttribute.attribute;

          return (
            <ProductVariantAttributeSelect
              key={productVariantsAttributeId}
              selectSidebar={selectSidebar}
              selectSidebarTarget={selectSidebarTarget}
              productVariants={productVariants}
              productVariantsAttributeId={productVariantsAttributeId}
              productVariantsAttribute={productVariantsAttribute}
              defaultValue={queryAttributes[productVariantsAttributeId]}
              productVariantsAttributesSelectedValues={
                productVariantsAttributesSelectedValues
              }
              onChangeSelection={optionValue =>
                onAttributeChange(productVariantsAttributeId, optionValue, slug)
              }
              onClearSelection={() =>
                onAttributeChange(productVariantsAttributeId, null, slug)
              }
            />
          );
        }
      )}
    </S.Wrapper>
  );
};
ProductVariantPicker.displayName = "ProductVariantPicker";
export default ProductVariantPicker;
