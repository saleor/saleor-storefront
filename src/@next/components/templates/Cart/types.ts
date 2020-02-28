import { CartItem } from "@sdk/react/components/CartProvider/context";
import { ApolloErrorWithUserInput } from "@sdk/react/types";

export interface IProps {
  items: CartItem[];
  error: ApolloErrorWithUserInput | null;
  loading: boolean;
  setItem(item: CartItem): void;
}
