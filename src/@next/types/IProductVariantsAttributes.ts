import {
  ProductDetails_product_variants_attributes_attribute,
  ProductDetails_product_variants_attributes_value,
} from "../../@sdk/queries/types/ProductDetails";

export interface IProductVariantsAttribute {
  attribute: ProductDetails_product_variants_attributes_attribute;
  values: ProductDetails_product_variants_attributes_value[];
}

export interface IProductVariantsAttributes {
  [key: string]: IProductVariantsAttribute;
}

export interface IProductVariantsAttributesSelectedValues {
  [key: string]: ProductDetails_product_variants_attributes_value | null;
}

export interface IProductVariantsAttributesOptionValue {
  disabled: boolean;
  id: any;
  label: string;
  value: string;
}
