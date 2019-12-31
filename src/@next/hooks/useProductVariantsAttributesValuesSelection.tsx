import { useEffect, useState } from "react";

import {
  IProductVariantsAttributes,
  IProductVariantsAttributesSelectedValues,
} from "@types";

export const useProductVariantsAttributesValuesSelection = (
  productVariantsAttributes: IProductVariantsAttributes
): [
  IProductVariantsAttributesSelectedValues,
  (
    selectedProductVariantsAttributeId: string,
    selectedProductVariantsAttributeValue: string | null
  ) => void
] => {
  const [
    productVariantsAttributesSelectedValues,
    setProductVariantsAttributesSelectedValues,
  ] = useState<IProductVariantsAttributesSelectedValues>({});

  useEffect(() => {
    const variableAttributesSelectedValue: IProductVariantsAttributesSelectedValues = {};
    Object.keys(productVariantsAttributes).forEach(
      productVariantsAttributeId => {
        variableAttributesSelectedValue[productVariantsAttributeId] = null;
      }
    );
  }, []);

  const selectProductVariantsAttributesValue = (
    selectedProductVariantsAttributeId: string,
    selectedProductVariantsAttributeValue: string | null
  ) => {
    setProductVariantsAttributesSelectedValues(
      prevVariantsAttributesSelectedValue => {
        const newVariantsAttributesSelectedValue: IProductVariantsAttributesSelectedValues = {};

        Object.keys(productVariantsAttributes).forEach(
          productVariantsAttributeId => {
            if (
              productVariantsAttributeId === selectedProductVariantsAttributeId
            ) {
              let selectedValue = null;
              if (selectedProductVariantsAttributeValue) {
                selectedValue =
                  productVariantsAttributes[
                    productVariantsAttributeId
                  ].values.find(
                    value =>
                      value.value === selectedProductVariantsAttributeValue
                  ) || null;
              }
              newVariantsAttributesSelectedValue[
                productVariantsAttributeId
              ] = selectedValue;
            } else {
              newVariantsAttributesSelectedValue[productVariantsAttributeId] =
                prevVariantsAttributesSelectedValue[productVariantsAttributeId];
            }
          }
        );

        return newVariantsAttributesSelectedValue;
      }
    );
  };

  return [
    productVariantsAttributesSelectedValues,
    selectProductVariantsAttributesValue,
  ];
};
