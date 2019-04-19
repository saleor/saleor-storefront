import { Omit } from "../core/tsUtils";
import { Address } from "./types/Address";

import { MutationFn } from "react-apollo";

import { AddressInput } from "../../types/globalTypes";
import { FormAddressType } from "../components";
import { getShop_shop } from "../components/ShopProvider/types/getShop";
import { FormError } from "../core/types";

import { CartLineInterface } from "../components/CartProvider/context";
import { User } from "../components/User/types/User";
import { CheckoutContextInterface } from "./context";
import { Checkout } from "./types/Checkout";

export type AddressType = Partial<
  Omit<Address, "__typename" | "id" | "country">
> & {
  country: {
    code: string;
    country: string;
  };
};

export interface ICheckoutData {
  shippingAddress: AddressInput;
  email?: string;
  lines?: CartLineInterface[];
}
export interface IGuestAddressProps {
  checkout: Checkout;
  loading: boolean;
  shop: getShop_shop;
  onSubmit: (selectedAddress: FormAddressType) => void;
  checkoutCreateUpdateErrors: [] | FormError[];
}

export interface UserAddressSelectorProps {
  loading: boolean;
  user: User;
  checkout: Checkout;
  checkoutUpdateErrors: [] | FormError[];
  shipping: boolean;
  onSubmit: (selectedAddress: FormAddressType) => void;
  update?: (checkoutData: CheckoutContextInterface) => Promise<void>;
}

export interface UserAddressSelectorState {
  addresses: FormAddressType[];
  selectedAddress?: FormAddressType;
}

export interface ILoggedSubmitArgs {
  email: string;
  checkoutId: string;
  update: (checkoutData: CheckoutContextInterface) => void;
  updateCheckout: MutationFn;
}

export interface IUnloggedSubmitArgs {
  checkoutId: string;
  update: (checkoutData: CheckoutContextInterface) => void;
  createCheckout: MutationFn;
  updateCheckout: MutationFn;
  lines: CartLineInterface[];
}
