import { ISelectOption } from "@types";
import {
  ProductDetails_product_variants_attributes_attribute,
  ProductDetails_product_variants_attributes_values,
} from "../../@sdk/queries/types/ProductDetails";

export interface IProductVariantsAttribute {
  attribute: ProductDetails_product_variants_attributes_attribute;
  values: ProductDetails_product_variants_attributes_values[];
}

export interface IProductVariantsAttributes {
  [key: string]: IProductVariantsAttribute;
}

export interface IProductVariantsAttributesSelectedValues {
  [key: string]: ProductDetails_product_variants_attributes_values | null;
}

export interface IProductVariantsAttributesOptionValue extends ISelectOption {
  disabled: boolean;
  id: any;
  label: string;
  value: string;
}
