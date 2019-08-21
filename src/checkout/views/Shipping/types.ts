import { History } from "history";

import {
  updateCheckoutShippingAddress_checkoutShippingAddressUpdate,
  updateCheckoutShippingAddressVariables
} from "@sdk/mutations/types//updateCheckoutShippingAddress";
import {
  createCheckout_checkoutCreate,
  createCheckoutVariables
} from "@sdk/mutations/types/createCheckout";
import { MutationFn, MutationResult } from "@sdk/react/useMutation";

import { AddressInput } from "../../../../types/globalTypes";
import { CartLineInterface } from "../../../components/CartProvider/context";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { User } from "../../../components/User/types/User";
import { CheckoutContextInterface } from "../../context";
import { Checkout } from "../../types/Checkout";

export interface ICheckoutData {
  shippingAddress: AddressInput;
  email?: string;
  lines?: CartLineInterface[];
}

export interface IShippingPageProps {
  checkoutId?: string;
  checkout?: Checkout;
  update: (checkoutData: CheckoutContextInterface) => void;
  lines?: CartLineInterface[];
  createCheckout: [
    MutationFn<
      {
        data: createCheckout_checkoutCreate;
      },
      createCheckoutVariables
    >,
    MutationResult<{
      data: createCheckout_checkoutCreate;
    }>
  ];
  updateShippingAddress: [
    MutationFn<
      {
        data: updateCheckoutShippingAddress_checkoutShippingAddressUpdate;
      },
      updateCheckoutShippingAddressVariables
    >,
    MutationResult<{
      data: updateCheckoutShippingAddress_checkoutShippingAddressUpdate;
    }>
  ];
  user: User;
  shop: getShop_shop;
  proceedToNextStepData: {
    update: (checkoutData: CheckoutContextInterface) => void;
    history: History;
    token?: string;
  };
}

export interface IShippingPageState {
  checkout: Checkout;
  loading: boolean;
  shippingUnavailable: boolean;
}
