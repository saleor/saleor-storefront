import React from "react";

import { InputSelect } from "@components/molecules";
import { ProductDetails_product_variants } from "@sdk/queries/types/ProductDetails";
import {
  IProductVariantsAttribute,
  IProductVariantsAttributesOptionValue,
  IProductVariantsAttributesSelectedValues,
} from "@temp/@next/types/IProductVariantsAttributes";

import { useSelectableProductVariantsAttributeValues } from "../../../hooks/useSelectableProductVariantsAttributeValues";

export const ProductVariantAttributeSelect: React.FC<{
  productVariantsAttributeId: string;
  productVariants: ProductDetails_product_variants[];
  productVariantsAttribute: IProductVariantsAttribute;
  productVariantsAttributesSelectedValues: IProductVariantsAttributesSelectedValues;
  onChangeSelection: (value: any, name?: any) => void;
  onClearSelection: () => void;
}> = ({
  productVariantsAttributeId,
  productVariants,
  productVariantsAttribute,
  productVariantsAttributesSelectedValues,
  onChangeSelection,
  onClearSelection,
}) => {
  const selectableProductVariantsAttributeValues = useSelectableProductVariantsAttributeValues(
    productVariantsAttributeId,
    productVariants,
    productVariantsAttributesSelectedValues
  );

  const getProductVariantsAttributesSelectedValue = () => {
    if (
      productVariantsAttributesSelectedValues &&
      productVariantsAttributesSelectedValues[productVariantsAttributeId]
    ) {
      return {
        disabled: false,
        id: productVariantsAttributesSelectedValues[productVariantsAttributeId]!
          .id,
        label: productVariantsAttributesSelectedValues[
          productVariantsAttributeId
        ]!.name!,
        value: productVariantsAttributesSelectedValues[
          productVariantsAttributeId
        ]!.value!,
      };
    } else {
      return null;
    }
  };

  const getProductVariantsAttributeOptionValues = (): IProductVariantsAttributesOptionValue[] => {
    const productVariantsAttributeValues: IProductVariantsAttributesOptionValue[] = productVariantsAttribute.values
      .filter(value => value)
      .map(value => {
        const isOptionDisabled =
          selectableProductVariantsAttributeValues[
            productVariantsAttributeId
          ] &&
          !selectableProductVariantsAttributeValues[
            productVariantsAttributeId
          ].values.includes(value);

        return {
          disabled: isOptionDisabled,
          id: value.id,
          label: value.name!,
          value: value.value!,
        };
      });

    return productVariantsAttributeValues;
  };

  const isOptionDisabled = (
    optionValue: IProductVariantsAttributesOptionValue
  ) => {
    return optionValue.disabled;
  };

  return (
    <InputSelect
      name={productVariantsAttribute.attribute.id}
      label={
        productVariantsAttribute.attribute.name
          ? productVariantsAttribute.attribute.name!
          : ""
      }
      value={getProductVariantsAttributesSelectedValue()}
      options={getProductVariantsAttributeOptionValues()}
      isOptionDisabled={isOptionDisabled}
      onChange={onChangeSelection}
      isClearable={true}
      clearValue={onClearSelection}
    />
  );
};
