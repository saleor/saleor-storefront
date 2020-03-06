import { Checkout } from "@sdk/fragments/types/Checkout";
import { SaleorAPI } from "@sdk/index";
import { ApolloErrorWithUserInput } from "@sdk/react/types";
import { ILocalRepository } from "@sdk/repository";

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
  private repository: ILocalRepository;

  constructor(api: SaleorAPI, repository: ILocalRepository) {
    this.api = api;
    this.repository = repository;
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
    /**
     * 1. save in local storage
     * 2. save online if possible
     *    a. make add request if checkout id available
     *    b. else get checkout from backend and make add request if checkout id available
     *    c. else create checkout if possible and make add request if checkout id available
     */

    // 1.
    const checkout = this.repository.getCheckout();
    const lines = checkout.lines;
    this.repository.setCheckout({
      ...checkout,
      lines: lines ? lines.concat([{ variantId, quantity }]) : lines,
    });

    // 2. TODO

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
    const checkoutToken = localStorage.getItem("checkoutToken");

    if (this.api.isLoggedIn()) {
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
    } else if (checkoutToken) {
      this.api.getCheckoutDetails(
        {
          token: checkoutToken,
        },
        {
          onError: error => {
            this.errors.push(error);
            this.loading.load = false;
          },
          onUpdate: data => {
            this.checkout = data;
            this.loading.load = false;
          },
        }
      );
    } else {
      this.createCheckout();
    }
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

  makeOrder = () => null;

  private getCheckout = async () => null;

  private createCheckout = async () => {
    const {
      email,
      shippingAddress,
      billingAddress,
      lines,
    } = this.repository.getCheckout();

    if (email && shippingAddress && billingAddress && lines) {
      const { data } = await this.api.setCreateCheckout({
        checkoutInput: {
          billingAddress,
          email,
          lines,
          shippingAddress,
        },
      });

      if (data?.errors) {
        this.errors.push(this.errors);
      } else {
        this.checkout = data?.checkout || null;
      }
    }
  };
}
