import { History } from "history";
import { MutationFn } from "react-apollo";

import { AddressInput } from "../../../../types/globalTypes";
<<<<<<< HEAD
=======
import { FormAddressType } from "../../../components";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";

>>>>>>> update address type in shipping components
import { CartLineInterface } from "../../../components/CartProvider/context";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { User } from "../../../components/User/types/User";
import { FormError } from "../../../core/types";
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
  createCheckout: MutationFn;
  updateCheckout: MutationFn;
  user: User;
<<<<<<< HEAD
  shop: getShop_shop;
  proceedToNextStepData: {
    update: (checkoutData: CheckoutContextInterface) => void;
    history: History;
    token?: string;
  };
}

export interface IShippingPageState {
  checkout: Checkout;
  errors: FormError[];
  loading: boolean;
  shippingUnavailable: boolean;
=======
  checkout: Checkout;
  shipping: boolean;
  onSubmit: (selectedAddress: FormAddressType) => void;
  update?: (checkoutData: CheckoutContextInterface) => Promise<void>;
}

export interface UserAddressSelectorState {
  addresses: FormAddressType[];
  selectedAddress?: FormAddressType;
>>>>>>> update address type in shipping components
}
