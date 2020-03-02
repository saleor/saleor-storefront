import { CartItem } from "@temp/@sdk/react/components/CheckoutProvider/context";
import { ApolloErrorWithUserInput } from "@sdk/react/types";

export interface IProps {
  items: CartItem[];
  error: ApolloErrorWithUserInput | null;
  loading: boolean;
  setItem(item: CartItem): void;
}
