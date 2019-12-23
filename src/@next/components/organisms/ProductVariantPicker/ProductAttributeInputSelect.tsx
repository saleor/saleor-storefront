import React from "react";

import { InputSelect } from "@components/molecules";
import { ProductDetails_product_variants_attributes_value } from "@sdk/queries/types/ProductDetails";

import {
  IProductVariableAttribute,
  IProductVariableAttributesOptionValue,
} from "./types";

export const ProductAttributeInputSelect: React.FC<{
  productVariableAttribute: IProductVariableAttribute;
  productPossibleVariableAttribute: IProductVariableAttribute;
  productVariableAttributesSelectedValue: ProductDetails_product_variants_attributes_value | null;
  onChange: (value: any, name?: any) => void;
}> = ({
  productVariableAttribute,
  productPossibleVariableAttribute,
  productVariableAttributesSelectedValue,
  onChange,
}) => {
  const getProductVariableAttributesSelectedValue = () => {
    if (productVariableAttributesSelectedValue) {
      return {
        disabled: false,
        id: productVariableAttributesSelectedValue.id,
        label: productVariableAttributesSelectedValue.name!,
        value: productVariableAttributesSelectedValue.value!,
      };
    } else {
      return null;
    }
  };

  const getProductVariableAttributeOptionValues = (): IProductVariableAttributesOptionValue[] => {
    const productVariableAttributeValues: IProductVariableAttributesOptionValue[] = productVariableAttribute.values
      .filter(value => value)
      .map(value => {
        const isOptionDisabled =
          productPossibleVariableAttribute &&
          !productPossibleVariableAttribute.values.includes(value);

        return {
          disabled: isOptionDisabled,
          id: value.id,
          label: value.name!,
          value: value.value!,
        };
      });

    return productVariableAttributeValues;
  };

  const isOptionDisabled = (
    optionValue: IProductVariableAttributesOptionValue
  ) => {
    return optionValue.disabled;
  };

  return (
    <InputSelect
      name={productVariableAttribute.attribute.id}
      label={
        productVariableAttribute.attribute.name
          ? productVariableAttribute.attribute.name!
          : ""
      }
      value={getProductVariableAttributesSelectedValue()}
      options={getProductVariableAttributeOptionValues()}
      isOptionDisabled={isOptionDisabled}
      onChange={onChange}
    />
  );
};
