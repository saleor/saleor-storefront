import { useEffect, useState } from "react";

import { ProductDetails_product_variants } from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";

import { IProductVariantsAttributes } from "@types";

export const useProductVariantsAttributes = (
  productVariants: ProductDetails_product_variants[]
): IProductVariantsAttributes => {
  const [productVariantsAttributes, setProductVariantsAttributes] = useState<
    IProductVariantsAttributes
  >({});

  useEffect(() => {
    const variantsAttributes: IProductVariantsAttributes = {};

    productVariants.forEach(productVariant => {
      productVariant.attributes.forEach(productVariantAttribute => {
        const productVariantAttributeId = productVariantAttribute.attribute.id;
        const variantsAttributeExists = variantsAttributes.hasOwnProperty(
          productVariantAttributeId
        );

        if (variantsAttributeExists) {
          const variantsAttributeValueExists = variantsAttributes[
            productVariantAttributeId
          ].values.includes(productVariantAttribute.values[0]!);

          if (!variantsAttributeValueExists) {
            variantsAttributes[productVariantAttributeId].values.push(
              productVariantAttribute.values[0]!
            );
          }
        } else {
          variantsAttributes[productVariantAttributeId] = {
            attribute: productVariantAttribute.attribute,
            values: [productVariantAttribute.values[0]!],
          };
        }
      });
    });

    setProductVariantsAttributes(variantsAttributes);
  }, [productVariants]);

  return productVariantsAttributes;
};
