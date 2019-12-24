import { ProductDetails_product_variants } from "@sdk/queries/types/ProductDetails";

import { IProductVariantsAttributesSelectedValues } from "@temp/@next/types/IProductVariantsAttributes";

export interface IProps {
  productVariants?: ProductDetails_product_variants[];
  onChange?: (
    selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants | undefined
  ) => void;
}
