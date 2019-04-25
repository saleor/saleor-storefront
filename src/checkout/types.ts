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

export type CheckoutFormType = "billing" | "shipping";
export interface ICheckoutData {
  shippingAddress: AddressInput;
  email?: string;
  lines?: CartLineInterface[];
}
export interface IGuestAddressProps {
  buttonText: string;
  checkout: Checkout | null;
  loading: boolean;
  shop: getShop_shop;
  onSubmit: (selectedAddress: FormAddressType) => any;
  errors: FormError[];
  proceedToNextStep: () => void;
  type?: CheckoutFormType;
}

export interface UserAddressSelectorProps {
  buttonText: string;
  loading: boolean;
  user: User;
  checkout: Checkout;
  errors: FormError[];
  proceedToNextStep: () => void;
  shippingAsBilling?: boolean;
  type?: CheckoutFormType;
  onSubmit: (selectedAddress: FormAddressType) => Promise<any>;
  update?: (checkoutData: CheckoutContextInterface) => Promise<void>;
}

export interface UserAddressSelectorState {
  addresses: FormAddressType[];
  selectedAddress?: FormAddressType;
}

export interface ISubmitArgs {
  email: string;
  checkoutId: string;
  update: (checkoutData: CheckoutContextInterface) => void;
  createCheckout: MutationFn;
  updateCheckout: MutationFn;
  lines: CartLineInterface[];
}

export interface IAddressPickerProps {
  addresses: FormAddressType[];
  billing: boolean;
  errors: FormError[];
  loading: boolean;
  selectedAddress?: FormAddressType;
  onSelect: (address: FormAddressType) => void;
  onSubmit: (selectedAddress: FormAddressType) => Promise<any>;
  onAddNew: (address: FormAddressType) => void;
}

export interface IAddressPickerState {
  showModal: boolean;
}
