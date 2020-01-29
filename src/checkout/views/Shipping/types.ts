import { History } from "history";

import {
  CreateCheckout_checkoutCreate,
  CreateCheckoutVariables,
} from "@sdk/mutations/types/CreateCheckout";
import {
  UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate,
  UpdateCheckoutShippingAddressVariables,
} from "@sdk/mutations/types/UpdateCheckoutShippingAddress";
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
        data: CreateCheckout_checkoutCreate;
      },
      CreateCheckoutVariables
    >,
    MutationResult<{
      data: CreateCheckout_checkoutCreate;
    }>
  ];
  updateShippingAddress: [
    MutationFn<
      {
        data: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate;
      },
      UpdateCheckoutShippingAddressVariables
    >,
    MutationResult<{
      data: UpdateCheckoutShippingAddress_checkoutShippingAddressUpdate;
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
