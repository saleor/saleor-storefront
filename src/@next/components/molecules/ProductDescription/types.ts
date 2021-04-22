import { StoreVariables } from "../../../../views/Product/gqlTypes/ProductDetails";

export interface IProps {
  description?: string;
  store?: StoreVariables;
  attributes?: Array<{
    attribute: { name: string };
    values: Array<{ name: string }>;
  }>;
}
