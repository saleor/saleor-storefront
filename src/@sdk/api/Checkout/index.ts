import { SaleorAPI } from "@sdk/index";
import { CheckoutNetworkManager } from "@sdk/network";
import { ApolloErrorWithUserInput } from "@sdk/react/types";
import {
  CheckoutRepositoryManager,
  ICheckoutModel,
  LocalRepository,
} from "@sdk/repository";

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

  // private pendingUpdate: {
  //   updateCart: boolean;
  //   billingAddress: boolean;
  //   shippingAddress: boolean;
  //   shippingAsBillingAddress: boolean;
  // };

  private api: SaleorAPI;
  private repositoryManager: CheckoutRepositoryManager;
  private networkManager: CheckoutNetworkManager;

  constructor(api: SaleorAPI, repository: LocalRepository) {
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

    this.api = api;
    this.repositoryManager = new CheckoutRepositoryManager(repository);
    this.networkManager = new CheckoutNetworkManager(this.api);

    this.repositoryManager.onCheckoutChangeListener(checkout => {
      this.checkout = checkout;
      console.log("Repository observer notification", checkout);
    });
  }

  addItemToCart = async (variantId: string, quantity: number) => {
    await this.provideData();

    // 1. save in local storage
    const alteredCheckout = this.repositoryManager.addItemToCart(
      this.checkout,
      variantId,
      quantity
    );

    // 2. save online if possible (if checkout id available)
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.addItemToCart = true;

      const { data, errors } = await this.networkManager.setCartItem(
        checkoutId,
        variantId,
        alteredCheckout?.lines.find(line => line.variantId === variantId)
          ?.quantity || 0
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
    this.repositoryManager.removeItemFromCart(this.checkout, variantId);

    // 2. save online if possible (if checkout id available)
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.removeItemFromCart = true;

      const { data, errors } = await this.networkManager.setCartItem(
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

  subtractItemFromCart = async (variantId: string) => {
    await this.provideData();

    // 1. save in local storage
    const alteredCheckout = this.repositoryManager.subtractItemFromCart(
      this.checkout,
      variantId
    );

    // 2. save online if possible (if checkout id available)
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.updateItemInCart = true;

      const { data, errors } = await this.networkManager.setCartItem(
        checkoutId,
        variantId,
        alteredCheckout?.lines.find(line => line.variantId === variantId)
          ?.quantity || 0
      );

      if (errors) {
        this.errors = this.errors.concat(errors);
      } else if (data) {
        this.checkout = data;
      }

      this.loading.updateItemInCart = false;
    }
  };

  updateItemInCart = async (variantId: string, quantity: number) => {
    await this.provideData();

    // 1. save in local storage
    this.repositoryManager.addItemToCart(this.checkout, variantId, quantity);

    // 2. save online if possible (if checkout id available)
    const checkoutId = this.checkout?.id;

    if (checkoutId) {
      this.loading.updateItemInCart = true;

      const { data, errors } = await this.networkManager.setCartItem(
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

    if (navigator.onLine) {
      // 2. Try to take checkout from backend database
      this.loading.load = true;
      const checkoutToken = this.repositoryManager
        .getRepository()
        .getCheckoutToken();

      const { data, errors } = await this.networkManager.getCheckout(
        checkoutToken
      );

      if (errors) {
        this.errors = this.errors.concat(errors);
      } else if (data) {
        this.repositoryManager.getRepository().setCheckout(data);
        this.checkout = data;
        return;
      }

      // 3. Try to take new created checkout from backend
      const { email, shippingAddress, billingAddress, lines } = this.checkout;
      if (email && shippingAddress && billingAddress && lines) {
        const { data, errors } = await this.networkManager.createCheckout(
          email,
          shippingAddress,
          billingAddress,
          lines
        );

        if (errors) {
          this.errors = this.errors.concat(errors);
        } else if (data) {
          this.repositoryManager.getRepository().setCheckout(data);
          this.checkout = data;
          return;
        }
      }
    } else {
      // 4. Try to take checkout from local storage
      let checkoutModel: ICheckoutModel | null;
      checkoutModel = this.repositoryManager.getRepository().getCheckout();

      if (checkoutModel) {
        this.checkout = checkoutModel;
        return;
      }
    }
  };
}
