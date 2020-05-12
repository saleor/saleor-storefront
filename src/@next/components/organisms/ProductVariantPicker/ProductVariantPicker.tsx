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
  queryVariants = {},
  onChange,
  selectSidebar = false,
  selectSidebarTarget,
  updateUrlWithAttributes,
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

  useEffect(() => {
    if (onChange) {
      for (const id of Object.keys(queryVariants)) {
        selectProductVariantsAttributesValue(id, queryVariants[id]);
      }
    }
  }, [queryVariants]);

  return (
    <S.Wrapper>
      {Object.keys(productVariantsAttributes).map(
        productVariantsAttributeId => {
          const slug =
            productVariantsAttributes[productVariantsAttributeId].attribute
              .slug;

          return (
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
              onChangeSelection={optionValue => {
                selectProductVariantsAttributesValue(
                  productVariantsAttributeId,
                  optionValue
                );

                slug && updateUrlWithAttributes(slug, optionValue);
              }}
              onClearSelection={() => {
                selectProductVariantsAttributesValue(
                  productVariantsAttributeId,
                  null
                );
                updateUrlWithAttributes(slug, "");
              }}
            />
          );
        }
      )}
    </S.Wrapper>
  );
};
