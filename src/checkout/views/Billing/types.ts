import { History } from "history";

import { MutationFn, MutationResult } from "@sdk/react/useMutation";

import {
  CreateCheckout_checkoutCreate,
  CreateCheckoutVariables,
} from "@sdk/mutations/types/CreateCheckout";
import { CartLineInterface } from "../../../components/CartProvider/context";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { User } from "../../../components/User/types/User";
import { FormError } from "../../../core/types";
import { CheckoutContextInterface } from "../../context";
import { Checkout } from "../../types/Checkout";
import {
  updateCheckoutBillingAddress_checkoutBillingAddressUpdate,
  updateCheckoutBillingAddressVariables,
} from "./types/updateCheckoutBillingAddress";

export interface IBillingPageProps {
  checkoutId?: string;
  checkout?: Checkout;
  update: (checkoutData: CheckoutContextInterface) => void;
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
  updateCheckoutBillingAddress: [
    MutationFn<
      {
        data: updateCheckoutBillingAddress_checkoutBillingAddressUpdate;
      },
      updateCheckoutBillingAddressVariables
    >,
    MutationResult<{
      data: updateCheckoutBillingAddress_checkoutBillingAddressUpdate;
    }>
  ];
  lines?: CartLineInterface[];
  shippingAsBilling: boolean;
  user: User;
  shop: getShop_shop;
  proceedToNextStepData: {
    update: (checkoutData: CheckoutContextInterface) => void;
    history: History;
    token?: string;
  };
  isShippingRequired: boolean;
}

export interface IBillingPageState {
  checkout: Checkout;
  errors: FormError[];
  loading: boolean;
}
