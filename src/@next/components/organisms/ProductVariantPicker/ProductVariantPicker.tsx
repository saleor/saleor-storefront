import React, { useEffect } from "react";

import { useProductVariantsAttributes } from "../../../hooks/useProductVariantsAttributes";
import { useProductVariantsAttributesValuesSelection } from "../../../hooks/useProductVariantsAttributesValuesSelection";
import { ProductVariantAttributeSelect } from "./ProductVariantAttributeSelect";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductVariantPicker: React.FC<IProps> = ({
  productVariants = [],
  onChange,
  selectSidebar = false,
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
          productVariantAttribute.value &&
          productVariantsAttributesSelectedValues[productVariantAttributeId] &&
          productVariantAttribute.value.id ===
            productVariantsAttributesSelectedValues[productVariantAttributeId]!
              .id
        ) {
          return true;
        } else {
          return false;
        }
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
