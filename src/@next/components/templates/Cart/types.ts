import { ApolloErrorWithUserInput } from "@sdk/react/types";

export interface ICartItem {
  productVariantId: string;
  quantity: number;
}

export interface IProps {
  items: ICartItem[];
  error: ApolloErrorWithUserInput | null;
  loading: boolean;
  updateItem(item: ICartItem): void;
}
