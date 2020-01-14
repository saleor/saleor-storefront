import React, { useEffect } from "react";

import {
  useProductVariantsAttributes,
  useProductVariantsAttributesValuesSelection,
} from "@hooks";
import { ProductVariantAttributeSelect } from "./ProductVariantAttributeSelect";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductVariantPicker: React.FC<IProps> = ({
  productVariants = [],
  onChange,
  selectSidebar = false,
  selectSidebarTarget,
}: IProps) => {
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

  return (
    <S.Wrapper>
      {Object.keys(productVariantsAttributes).map(
        productVariantsAttributeId => (
          <ProductVariantAttributeSelect
            key={productVariantsAttributeId}
            selectSidebar={selectSidebar}
            selectSidebarTarget={selectSidebarTarget}
            productVariants={productVariants}
            productVariantsAttributeId={productVariantsAttributeId}
            productVariantsAttribute={
              productVariantsAttributes[productVariantsAttributeId]
            }
            productVariantsAttributesSelectedValues={
              productVariantsAttributesSelectedValues
            }
            onChangeSelection={optionValue =>
              selectProductVariantsAttributesValue(
                productVariantsAttributeId,
                optionValue
              )
            }
            onClearSelection={() =>
              selectProductVariantsAttributesValue(
                productVariantsAttributeId,
                null
              )
            }
          />
        )
      )}
    </S.Wrapper>
  );
};
