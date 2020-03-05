import { ApolloErrorWithUserInput } from "@sdk/react/types";

export interface ICartItem {
  variantId: string;
  quantity: number;
}

export interface IProps {
  items: ICartItem[];
  errors: Array<ApolloErrorWithUserInput | null>;
  loading: boolean;
  updateItem(variantId: string, quantity: number): void;
  removeItem(variantId: string): void;
}
