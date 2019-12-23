import {
  ProductDetails_product_variants,
  ProductDetails_product_variants_attributes_attribute,
  ProductDetails_product_variants_attributes_value,
} from "@sdk/queries/types/ProductDetails";

export interface IProductVariableAttribute {
  attribute: ProductDetails_product_variants_attributes_attribute;
  values: ProductDetails_product_variants_attributes_value[];
}

export interface IProductVariableAttributes {
  [key: string]: IProductVariableAttribute;
}

export interface IProductVariableAttributesSelectedValue {
  [key: string]: ProductDetails_product_variants_attributes_value | null;
}

export interface IProductVariableAttributesOptionValue {
  disabled: boolean;
  id: any;
  label: string;
  value: string;
}

export interface IProps {
  productVariants?: ProductDetails_product_variants[];
}
