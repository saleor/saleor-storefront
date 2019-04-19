import { MutationFn } from "react-apollo";

import { AddressInput } from "../../../../types/globalTypes";
import { FormAddressType } from "../../../components";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { FormError } from "../../../core/types";

import { CartLineInterface } from "../../../components/CartProvider/context";
import { User } from "../../../components/User/types/User";
import { CheckoutContextInterface } from "../../context";
import { Checkout } from "../../types/Checkout";

export interface ICheckoutData {
  shippingAddress: AddressInput;
  email?: string;
  lines?: CartLineInterface[];
}
export interface IGuestAddressProps {
  checkout: Checkout;
  computeCheckoutData: (
    data: FormAddressType,
    lines?: CartLineInterface[]
  ) => ICheckoutData;
  createCheckout: MutationFn;
  lines: CartLineInterface[];
  loading: boolean;
  shop: getShop_shop;
  updateCheckout: MutationFn;
  update?: (checkoutData: CheckoutContextInterface) => Promise<void>;
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
