import { Checkout } from "@sdk/fragments/types/Checkout";
import { SaleorAPI } from "@sdk/index";
import { ApolloErrorWithUserInput } from "@sdk/react/types";
import { ICheckoutModel, ILocalRepository } from "@sdk/repository";

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

    // 2.
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.addItemToCart = true;
      const { data } = await this.api.setCheckoutLine({
        checkoutId,
        lines: [{ variantId, quantity }],
      });

      if (data?.checkout) {
        const {
          id,
          email,
          shippingAddress,
          billingAddress,
          lines,
        } = data?.checkout;
        this.checkout = {
          billingAddress,
          email,
          id,
          lines: lines
            ?.filter(item => item?.quantity && item.variant.id)
            .map(item => ({
              quantity: item!.quantity,
              variantId: item!.variant.id,
            })),
          shippingAddress,
        };
      } else {
        this.checkout = null;
      }
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

    // 2.
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.removeItemFromCart = true;
      const { data } = await this.api.setCheckoutLine({
        checkoutId,
        lines: [{ variantId, quantity: 0 }],
      });

      if (data?.checkout) {
        const {
          id,
          email,
          shippingAddress,
          billingAddress,
          lines,
        } = data?.checkout;
        this.checkout = {
          billingAddress,
          email,
          id,
          lines: lines
            ?.filter(item => item?.quantity && item.variant.id)
            .map(item => ({
              quantity: item!.quantity,
              variantId: item!.variant.id,
            })),
          shippingAddress,
        };
      } else {
        this.checkout = null;
      }
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

    // 2.
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.updateItemInCart = true;
      const { data } = await this.api.setCheckoutLine({
        checkoutId,
        lines: [{ variantId, quantity }],
      });

      if (data?.checkout) {
        const {
          id,
          email,
          shippingAddress,
          billingAddress,
          lines,
        } = data?.checkout;
        this.checkout = {
          billingAddress,
          email,
          id,
          lines: lines
            ?.filter(item => item?.quantity && item.variant.id)
            .map(item => ({
              quantity: item!.quantity,
              variantId: item!.variant.id,
            })),
          shippingAddress,
        };
      } else {
        this.checkout = null;
      }
      this.errors = this.errors.concat(data?.errors);
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
    let checkout: Checkout | null;
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

    if (checkout) {
      const { id, email, shippingAddress, billingAddress, lines } = checkout;
      this.checkout = {
        billingAddress,
        email,
        id,
        lines: lines
          ?.filter(item => item?.quantity && item.variant.id)
          .map(item => ({
            quantity: item!.quantity,
            variantId: item!.variant.id,
          })),
        shippingAddress,
      };
      return;
    }

    // 4. Try to take new created checkout from backend
    checkout = await this.createCheckout(this.checkout);

    if (checkout) {
      const { id, email, shippingAddress, billingAddress, lines } = checkout;
      this.checkout = {
        billingAddress,
        email,
        id,
        lines: lines
          ?.filter(item => item?.quantity && item.variant.id)
          .map(item => ({
            quantity: item!.quantity,
            variantId: item!.variant.id,
          })),
        shippingAddress,
      };
      this.loading.load = false;
      return;
    }
  };

  private createCheckout = async ({
    email,
    shippingAddress,
    billingAddress,
    lines,
  }: ICheckoutModel) => {
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
