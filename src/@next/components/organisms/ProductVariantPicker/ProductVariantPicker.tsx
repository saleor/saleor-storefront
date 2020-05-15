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
  queryAttributes = {},
  onAttributeChangeHandler,
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
          const slug = productVariantsAttribute.attribute.slug;

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
