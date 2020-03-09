import { Checkout } from "@sdk/fragments/types/Checkout";
import { SaleorAPI } from "@sdk/index";
import { ApolloErrorWithUserInput } from "@sdk/react/types";
import { ICheckoutModel, ILocalRepository } from "@sdk/repository";

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
    await this.provideData();

    /**
     * 1. save in local storage
     * 2. save online if possible (if checkout id available)
     */

    // 1.
    const checkout = this.repository.getCheckout();
    const lines = checkout?.lines || [];
    this.repository.setCheckout({
      ...checkout,
      lines: lines
        ? lines.concat([{ variantId, quantity }])
        : [{ variantId, quantity }],
    });

    // 2.
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.addItemToCart = true;
      const { data } = await this.api.setCheckoutLine({
        checkoutId,
        lines: [{ variantId, quantity }],
      });

      this.checkout = data?.checkout || null;
      this.errors = this.errors.concat(data?.errors);
      this.loading.addItemToCart = false;
    }
  };

  load = async () => {
    await this.provideData();
  };

  removeItemFromCart = async (variantId: string) => {
    await this.provideData();

    /**
     * 1. save in local storage
     * 2. save online if possible (if checkout id available)
     */

    // 1.
    const checkout = this.repository.getCheckout();
    const lines = checkout?.lines || [];
    this.repository.setCheckout({
      ...checkout,
      lines: lines
        ? lines.concat([{ variantId, quantity: 0 }])
        : [{ variantId, quantity: 0 }],
    });

    // 2.
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.removeItemFromCart = true;
      const { data } = await this.api.setCheckoutLine({
        checkoutId,
        lines: [{ variantId, quantity: 0 }],
      });

      this.checkout = data?.checkout || null;
      this.errors = this.errors.concat(data?.errors);
      this.loading.removeItemFromCart = false;
    }
  };

  setBillingAddress = () => null;

  setShippingAddress = () => null;

  setShippingAsBillingAddress = () => null;

  updateItemInCart = async (variantId: string, quantity: number) => {
    await this.provideData();

    /**
     * 1. save in local storage
     * 2. save online if possible (if checkout id available)
     */

    // 1.
    const checkout = this.repository.getCheckout();
    const lines = checkout?.lines || [];
    this.repository.setCheckout({
      ...checkout,
      lines: lines
        ? lines.concat([{ variantId, quantity }])
        : [{ variantId, quantity }],
    });

    // 2.
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.updateItemInCart = true;
      const { data } = await this.api.setCheckoutLine({
        checkoutId,
        lines: [{ variantId, quantity }],
      });

      this.checkout = data?.checkout || null;
      this.errors = this.errors.concat(data?.errors);
      this.loading.updateItemInCart = false;
    }
  };

  makeOrder = () => null;

  private provideData = async () => {
    // 1. Try to take checkout from runtime memory
    if (!this.checkout) {
      return;
    }

    // 2. Try to take checkout from local storage
    let checkout:
      | Checkout
      | ICheckoutModel
      | null = this.repository.getCheckout();

    if (!checkout) {
      this.checkout = checkout;
      return;
    }

    // 3. Try to take checkout from backend database
    this.loading.load = true;
    const checkoutToken = this.repository.getCheckoutToken();
    checkout = await new Promise((resolve, reject) => {
      if (this.api.isLoggedIn()) {
        this.api.getUserCheckout(null, {
          onError: error => {
            reject(error);
            // this.errors.push(error);
            // this.loading.load = false;
          },
          onUpdate: data => {
            resolve(data);
            // this.checkout = data;
            // this.loading.load = false;
          },
        });
      } else if (checkoutToken) {
        this.api.getCheckoutDetails(
          {
            token: checkoutToken,
          },
          {
            onError: error => {
              reject(error);
              // this.errors.push(error);
              // this.loading.load = false;
            },
            onUpdate: data => {
              resolve(data);
              // this.checkout = data;
              // this.loading.load = false;
            },
          }
        );
      }
    });

    if (!checkout) {
      this.checkout = checkout;
      return;
    }

    // 4. Try to take new created checkout from backend
    checkout = await this.createCheckout();

    if (!checkout) {
      this.checkout = checkout;
      this.loading.load = false;
      return;
    }
  };

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
        throw this.errors;
      } else {
        return data?.checkout || null;
      }
    } else {
      return null;
    }
  };
}
