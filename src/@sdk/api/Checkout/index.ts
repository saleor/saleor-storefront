import { Checkout } from "@sdk/fragments/types/Checkout";
import { SaleorAPI } from "@sdk/index";
import { ApolloErrorWithUserInput } from "@sdk/react/types";
import { ICheckoutModel, ILocalRepository } from "@sdk/repository";

import { CheckoutController } from "@temp/@sdk/controllers";
import { ICheckoutController } from "@temp/@sdk/controllers/Checkout/types";
import { ISaleorCheckoutAPI } from "./types";

export class SaleorCheckoutAPI implements ISaleorCheckoutAPI {
  errors: Array<ApolloErrorWithUserInput | any>;
  checkout: ICheckoutModel | null;
  loading: {
    addItemToCart: boolean;
    load: boolean;
    removeItemFromCart: boolean;
    setBillingAddress: boolean;
    setShippingAddress: boolean;
    setShippingAsBillingAddress: boolean;
    updateItemInCart: boolean;
  };
  pendingUpdate: {
    updateCart: boolean;
    billingAddress: boolean;
    shippingAddress: boolean;
    shippingAsBillingAddress: boolean;
  };
  promoCode: string | null;
  shippingAsBilling: boolean;

  private api: SaleorAPI;
  private repository: ILocalRepository;
  private controller: ICheckoutController;

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
    this.controller = new CheckoutController(this.api);
  }

  addItemToCart = async (variantId: string, quantity: number) => {
    await this.provideData();

    // 1. save in local storage
    const lines = this.checkout?.lines || [];
    const checkout = this.checkout
      ? {
          ...this.checkout,
          lines: lines
            ? lines.concat([{ variantId, quantity }])
            : [{ variantId, quantity }],
        }
      : null;
    this.repository.setCheckout(checkout);

    // 2. save online if possible (if checkout id available)
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.addItemToCart = true;

      const { data, errors } = await this.controller.setCartItem(
        checkoutId,
        variantId,
        quantity
      );

      if (errors) {
        this.errors = this.errors.concat(errors);
      } else if (data) {
        this.checkout = data;
      }

      this.loading.addItemToCart = false;
    }
  };

  load = async () => {
    await this.provideData();
  };

  removeItemFromCart = async (variantId: string) => {
    await this.provideData();

    // 1. save in local storage
    const lines = this.checkout?.lines || [];
    const checkout = this.checkout
      ? {
          ...this.checkout,
          lines: lines
            ? lines.concat([{ variantId, quantity: 0 }])
            : [{ variantId, quantity: 0 }],
        }
      : null;
    this.repository.setCheckout(checkout);

    // 2. save online if possible (if checkout id available)
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.removeItemFromCart = true;

      const { data, errors } = await this.controller.setCartItem(
        checkoutId,
        variantId,
        0
      );

      if (errors) {
        this.errors = this.errors.concat(errors);
      } else if (data) {
        this.checkout = data;
      }

      this.loading.removeItemFromCart = false;
    }
  };

  setBillingAddress = () => null;

  setShippingAddress = () => null;

  setShippingAsBillingAddress = () => null;

  updateItemInCart = async (variantId: string, quantity: number) => {
    await this.provideData();

    // 1. save in local storage
    const lines = this.checkout?.lines || [];
    const checkout = this.checkout
      ? {
          ...this.checkout,
          lines: lines
            ? lines.concat([{ variantId, quantity }])
            : [{ variantId, quantity }],
        }
      : null;
    this.repository.setCheckout(checkout);

    // 2. save online if possible (if checkout id available)
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.updateItemInCart = true;

      const { data, errors } = await this.controller.setCartItem(
        checkoutId,
        variantId,
        quantity
      );

      if (errors) {
        this.errors = this.errors.concat(errors);
      } else if (data) {
        this.checkout = data;
      }

      this.loading.updateItemInCart = false;
    }
  };

  makeOrder = () => null;

  private provideData = async () => {
    // 1. Try to take checkout from runtime memory
    if (this.checkout) {
      return;
    }

    // 2. Try to take checkout from local storage
    let checkoutModel: ICheckoutModel | null;
    checkoutModel = this.repository.getCheckout();

    if (checkoutModel) {
      this.checkout = checkoutModel;
      return;
    }

    // 3. Try to take checkout from backend database
    this.loading.load = true;
    const checkoutToken = this.repository.getCheckoutToken();

    const { data, errors } = await this.controller.getCheckout(checkoutToken);

    if (errors) {
      this.errors = this.errors.concat(errors);
    } else if (data) {
      this.checkout = data;
      return;
    }

    // 4. Try to take new created checkout from backend
    const { email, shippingAddress, billingAddress, lines } = this.checkout;
    if (email && shippingAddress && billingAddress && lines) {
      const { data, errors } = await this.controller.createCheckout(
        email,
        shippingAddress,
        billingAddress,
        lines
      );

      if (errors) {
        this.errors = this.errors.concat(errors);
      } else if (data) {
        this.checkout = data;
        return;
      }
    }
  };
}
