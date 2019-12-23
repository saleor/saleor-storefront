import React, { useEffect, useState } from "react";

import { InputSelect } from "@components/molecules";
import { ProductDetails_product_variants } from "@sdk/queries/types/ProductDetails";

import { useProductVariableAttributes } from "./ProductVariantPicker";
import {
  IProductVariableAttribute,
  IProductVariableAttributesOptionValue,
  IProductVariableAttributesSelectedValue,
} from "./types";

const usePossibleProductVariants = (
  productVariableAttributeId: string,
  productVariants: ProductDetails_product_variants[],
  productVariableAttributesSelectedValue: IProductVariableAttributesSelectedValue
): ProductDetails_product_variants[] => {
  const [productPossibleVariants, setProductPossibleVariants] = useState<
    ProductDetails_product_variants[]
  >([]);

  useEffect(() => {
    const possibleVariants = productVariants.filter(productVariant => {
      return Object.keys(productVariableAttributesSelectedValue).every(
        selectedValueId => {
          if (selectedValueId === productVariableAttributeId) {
            return true;
          }
          if (!productVariableAttributesSelectedValue[selectedValueId]) {
            return true;
          }
          return productVariant.attributes.some(productVariantAttribute => {
            return (
              productVariantAttribute.attribute.id === selectedValueId &&
              productVariantAttribute.value ===
                productVariableAttributesSelectedValue[selectedValueId]
            );
          });
        }
      );
    });

    setProductPossibleVariants(possibleVariants);
  }, [
    productVariableAttributeId,
    productVariants,
    productVariableAttributesSelectedValue,
  ]);

  return productPossibleVariants;
};

export const ProductAttributeInputSelect: React.FC<{
  productVariableAttributeId: string;
  productVariants: ProductDetails_product_variants[];
  productVariableAttribute: IProductVariableAttribute;
  productVariableAttributesSelectedValue: IProductVariableAttributesSelectedValue;
  onChange: (value: any, name?: any) => void;
}> = ({
  productVariableAttributeId,
  productVariants,
  productVariableAttribute,
  productVariableAttributesSelectedValue,
  onChange,
}) => {
  const productPossibleVariants = usePossibleProductVariants(
    productVariableAttributeId,
    productVariants,
    productVariableAttributesSelectedValue
  );
  const productPossibleVariableAttributes = useProductVariableAttributes(
    productPossibleVariants
  );

  const getProductVariableAttributesSelectedValue = () => {
    if (
      productVariableAttributesSelectedValue &&
      productVariableAttributesSelectedValue[productVariableAttributeId]
    ) {
      return {
        disabled: false,
        id: productVariableAttributesSelectedValue[productVariableAttributeId]!
          .id,
        label: productVariableAttributesSelectedValue[
          productVariableAttributeId
        ]!.name!,
        value: productVariableAttributesSelectedValue[
          productVariableAttributeId
        ]!.value!,
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
          productPossibleVariableAttributes[productVariableAttributeId] &&
          !productPossibleVariableAttributes[
            productVariableAttributeId
          ].values.includes(value);

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
