import { Checkout } from "@sdk/fragments/types/Checkout";
import { SaleorAPI } from "@sdk/index";
import { ApolloErrorWithUserInput } from "@sdk/react/types";

import { ISaleorCheckoutAPI } from "./types";

export class SaleorCheckoutAPI implements ISaleorCheckoutAPI {
  errors: Array<ApolloErrorWithUserInput | any>;
  checkout: Checkout | null;
  loading: {
    addItemToCart: boolean;
    load: boolean;
    removeItemFromCart: boolean;
    setBillingAddress: boolean;
    setShippingAddress: boolean;
    setShippingAsBillingAddress: boolean;
    updateItemInCart: boolean;
  };
  promoCode: string | null;
  shippingAsBilling: boolean;

  private api: SaleorAPI;

  constructor(api: SaleorAPI) {
    this.api = api;
    this.errors = [];
    this.checkout = null;
    this.loading = {
      addItemToCart: false,
      load: false,
      removeItemFromCart: false,
      setBillingAddress: false,
      setShippingAddress: false,
      setShippingAsBillingAddress: false,
      updateItemInCart: false,
    };
    this.promoCode = null;
    this.shippingAsBilling = false;
  }

  addItemToCart = async (variantId: string, quantity: number) => {
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.addItemToCart = true;
      const { data } = await this.api.setCheckoutLine({
        checkoutId,
        lines: [{ variantId, quantity }],
      });

      this.checkout = data?.checkout || null;
      this.errors.concat(data?.errors);
      this.loading.addItemToCart = false;
    }
  };

  load = async () => {
    this.loading.load = true;
    // const checkoutId = this.checkout?.id;

    // if (checkoutId) {
    this.api.getUserCheckout(null, {
      onError: error => {
        this.errors.push(error);
        this.loading.load = false;
      },
      onUpdate: data => {
        this.checkout = data;
        this.loading.load = false;
      },
    });
    // }
  };

  removeItemFromCart = async (variantId: string) => {
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.removeItemFromCart = true;
      const { data } = await this.api.setCheckoutLine({
        checkoutId,
        lines: [{ variantId, quantity: 0 }],
      });

      this.checkout = data?.checkout || null;
      this.errors.concat(data?.errors);
      this.loading.removeItemFromCart = false;
    }
  };

  setBillingAddress = () => null;

  setShippingAddress = () => null;

  setShippingAsBillingAddress = () => null;

  updateItemInCart = async (variantId: string, quantity: number) => {
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.updateItemInCart = true;
      const { data } = await this.api.setCheckoutLine({
        checkoutId,
        lines: [{ variantId, quantity }],
      });

      this.checkout = data?.checkout || null;
      this.errors.concat(data?.errors);
      this.loading.updateItemInCart = false;
    }
  };
}
