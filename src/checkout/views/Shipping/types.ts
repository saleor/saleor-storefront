import { MutationFn } from "react-apollo";

import { AddressInput } from "../../../../types/globalTypes";
import { FormAddressType } from "../../../components";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";

import { CartLineInterface } from "../../../components/CartProvider/context";
import { User } from "../../../components/User/types/User";
import { CheckoutContextInterface } from "../../context";
import { Checkout } from "../../types/Checkout";
import { createCheckout } from "../../types/createCheckout";
import { updateCheckoutShippingAddress } from "./types/updateCheckoutShippingAddress";

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
  createData: createCheckout;
  lines: CartLineInterface[];
  loading: boolean;
  shop: getShop_shop;
  updateCheckout: MutationFn;
  update?: (checkoutData: CheckoutContextInterface) => Promise<void>;
  updateData: updateCheckoutShippingAddress;
}

export interface UserAddressSelectorProps {
  loading: boolean;
  user: User;
  checkout: Checkout;
  shipping: boolean;
  onSubmit: (selectedAddress: FormAddressType) => void;
  update?: (checkoutData: CheckoutContextInterface) => Promise<void>;
}

export interface UserAddressSelectorState {
  addresses: FormAddressType[];
  selectedAddress?: FormAddressType;
}
