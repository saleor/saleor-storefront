import React, { useEffect, useState } from "react";

import { InputSelect, TextField } from "@components/molecules";
import { ProductDetails_product_variants } from "@sdk/queries/types/ProductDetails";

import * as S from "./styles";
import {
  IProductVariableAttributes,
  IProductVariableAttributesOptionValue,
  IProductVariableAttributesSelectedValue,
  IProps,
} from "./types";

const useProductVariableAttributes = (
  productVariants: ProductDetails_product_variants[]
): IProductVariableAttributes => {
  const [productVariableAttributes, setProductVariableAttributes] = useState<
    IProductVariableAttributes
  >({});

  useEffect(() => {
    const varibleAttributes: IProductVariableAttributes = {};

    productVariants.forEach(productVariant => {
      productVariant.attributes.forEach(productVariantAttribute => {
        const productVariantAttributeId = productVariantAttribute.attribute.id;
        const varibleAttributeExists = varibleAttributes.hasOwnProperty(
          productVariantAttributeId
        );

        if (varibleAttributeExists) {
          const varibleAttributeValueExists = varibleAttributes[
            productVariantAttributeId
          ].values.includes(productVariantAttribute.value!);

          if (!varibleAttributeValueExists) {
            varibleAttributes[productVariantAttributeId].values.push(
              productVariantAttribute.value!
            );
          }
        } else {
          varibleAttributes[productVariantAttributeId] = {
            attribute: productVariantAttribute.attribute,
            values: [productVariantAttribute.value!],
          };
        }
      });
    });

    setProductVariableAttributes(varibleAttributes);
  }, [productVariants]);

  return productVariableAttributes;
};

const usePossibleProductVariants = (
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
          if (!productVariableAttributesSelectedValue[selectedValueId]) {
            return true;
          }
          productVariant.attributes.some(productVariantAttribute => {
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
  }, [productVariants, productVariableAttributesSelectedValue]);

  return productPossibleVariants;
};

const useProductVariableAttributesSelectedValue = (
  productVariableAttributes: IProductVariableAttributes
): [
  IProductVariableAttributesSelectedValue,
  (
    selectedProductVariableAttributeId: string,
    selectedProductVariableAttributeValue: string
  ) => void
] => {
  const [
    productVariableAttributesSelectedValue,
    setProductVariableAttributesSelectedValue,
  ] = useState<IProductVariableAttributesSelectedValue>({});

  useEffect(() => {
    const variableAttributesSelectedValue: IProductVariableAttributesSelectedValue = {};
    Object.keys(productVariableAttributes).forEach(
      productVariableAttributeId => {
        variableAttributesSelectedValue[productVariableAttributeId] = null;
      }
    );
  }, []);

  useEffect(() => {
    // tslint:disable-next-line:no-console
    console.log(productVariableAttributesSelectedValue);
  }, [productVariableAttributesSelectedValue]);

  const selectProductVariableAttributesValue = (
    selectedProductVariableAttributeId: string,
    selectedProductVariableAttributeValue: string
  ) => {
    // tslint:disable-next-line:no-console
    console.log(
      selectedProductVariableAttributeId,
      selectedProductVariableAttributeValue
    );
    setProductVariableAttributesSelectedValue(
      prevVariableAttributesSelectedValue => {
        const newVariableAttributesSelectedValue: IProductVariableAttributesSelectedValue = {};

        Object.keys(productVariableAttributes).forEach(
          productVariableAttributeId => {
            if (
              productVariableAttributeId === selectedProductVariableAttributeId
            ) {
              const selectedValue =
                productVariableAttributes[
                  productVariableAttributeId
                ].values.find(
                  value => value.value === selectedProductVariableAttributeValue
                ) || null;
              newVariableAttributesSelectedValue[
                productVariableAttributeId
              ] = selectedValue;
            } else {
              newVariableAttributesSelectedValue[productVariableAttributeId] =
                prevVariableAttributesSelectedValue[productVariableAttributeId];
            }
          }
        );

        return newVariableAttributesSelectedValue;
      }
    );
  };

  return [
    productVariableAttributesSelectedValue,
    selectProductVariableAttributesValue,
  ];
};

export const ProductVariantPicker: React.FC<IProps> = ({
  productVariants = [],
}: IProps) => {
  const productVariableAttributes = useProductVariableAttributes(
    productVariants
  );
  const [
    productVariableAttributesSelectedValue,
    selectProductVariableAttributesValue,
  ] = useProductVariableAttributesSelectedValue(productVariableAttributes);
  const productPossibleVariants = usePossibleProductVariants(
    productVariants,
    productVariableAttributesSelectedValue
  );
  const productPossibleVariableAttributes = useProductVariableAttributes(
    productPossibleVariants
  );

  const getProductVariableAttributeOptionValues = (
    productVariableAttributeId: string
  ): IProductVariableAttributesOptionValue[] => {
    const productVariableAttribute =
      productVariableAttributes[productVariableAttributeId];
    const productPossibleVariableAttribute =
      productPossibleVariableAttributes[productVariableAttributeId];

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

  const getProductVariableAttributesSelectedValue = (
    productVariableAttributeId: string
  ) => {
    if (
      productVariableAttributesSelectedValue &&
      productVariableAttributesSelectedValue[productVariableAttributeId]
    ) {
      const optionValue =
        productVariableAttributesSelectedValue[productVariableAttributeId];

      if (optionValue) {
        return {
          disabled: false,
          id: optionValue.id,
          label: optionValue.name!,
          value: optionValue.value!,
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    <S.Wrapper>
      {Object.keys(productVariableAttributes).map(
        productVariableAttributeId => (
          <InputSelect
            key={
              productVariableAttributes[productVariableAttributeId].attribute.id
            }
            name={
              productVariableAttributes[productVariableAttributeId].attribute.id
            }
            label={
              productVariableAttributes[productVariableAttributeId].attribute
                .name
                ? productVariableAttributes[productVariableAttributeId]
                    .attribute.name!
                : ""
            }
            value={getProductVariableAttributesSelectedValue(
              productVariableAttributeId
            )}
            options={getProductVariableAttributeOptionValues(
              productVariableAttributeId
            )}
            // isOptionDisabled={(
            //   optionValue: IProductVariableAttributesOptionValue
            // ) => optionValue.disabled}
            onChange={optionValue =>
              selectProductVariableAttributesValue(
                productVariableAttributeId,
                optionValue.value
              )
            }
            autoComplete="given-name"
          />
        )
      )}
      <TextField
        name="quantity"
        label="Quantity"
        autoComplete="given-name"
        // {...basicInputProps()}
      />
      {/* --- here --- */}
    </S.Wrapper>
  );
};
