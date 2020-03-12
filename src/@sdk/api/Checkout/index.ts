import { SaleorAPI } from "@sdk/index";
import { CheckoutJobQueue } from "@sdk/jobs/Checkout";
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

  private checkoutRepositoryManager: CheckoutRepositoryManager;
  private checkoutNetworkManager: CheckoutNetworkManager;
  private checkoutJobQueue: CheckoutJobQueue;

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

    this.checkoutRepositoryManager = new CheckoutRepositoryManager(repository);
    this.checkoutNetworkManager = new CheckoutNetworkManager(api);
    this.checkoutJobQueue = new CheckoutJobQueue(
      repository,
      this.checkoutNetworkManager
    );
    this.checkoutRepositoryManager.onCheckoutChangeListener(checkout => {
      this.checkout = checkout;
      console.log("Repository observer notification", checkout);
    });
  }

  addItemToCart = async (variantId: string, quantity: number) => {
    await this.provideData();

    // 1. save in local storage
    this.checkoutRepositoryManager.addItemToCart(
      this.checkout,
      variantId,
      quantity
    );

    // 2. save online if possible (if checkout id available)
    this.checkoutJobQueue.enqueueSetCartItem();
  };

  load = async () => {
    await this.provideData();
  };

  removeItemFromCart = async (variantId: string) => {
    await this.provideData();

    // 1. save in local storage
    this.checkoutRepositoryManager.removeItemFromCart(this.checkout, variantId);

    // 2. save online if possible (if checkout id available)
    this.checkoutJobQueue.enqueueSetCartItem();
  };

  setBillingAddress = () => null;

  setShippingAddress = () => null;

  setShippingAsBillingAddress = () => null;

  subtractItemFromCart = async (variantId: string) => {
    await this.provideData();

    // 1. save in local storage
    this.checkoutRepositoryManager.subtractItemFromCart(
      this.checkout,
      variantId
    );

    // 2. save online if possible (if checkout id available)
    this.checkoutJobQueue.enqueueSetCartItem();
  };

  updateItemInCart = async (variantId: string, quantity: number) => {
    await this.provideData();

    // 1. save in local storage
    this.checkoutRepositoryManager.updateItemInCart(
      this.checkout,
      variantId,
      quantity
    );

    // 2. save online if possible (if checkout id available)
    this.checkoutJobQueue.enqueueSetCartItem();
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
      const checkoutToken = this.checkoutRepositoryManager
        .getRepository()
        .getCheckoutToken();

      const { data, errors } = await this.checkoutNetworkManager.getCheckout(
        checkoutToken
      );

      if (errors) {
        this.errors = this.errors.concat(errors);
      } else if (data) {
        this.checkoutRepositoryManager.getRepository().setCheckout(data);
        this.checkout = data;
        return;
      }

      // 3. Try to take new created checkout from backend
      const { email, shippingAddress, billingAddress, lines } = this.checkout;
      if (email && shippingAddress && billingAddress && lines) {
        const {
          data,
          errors,
        } = await this.checkoutNetworkManager.createCheckout(
          email,
          shippingAddress,
          billingAddress,
          lines
        );

        if (errors) {
          this.errors = this.errors.concat(errors);
        } else if (data) {
          this.checkoutRepositoryManager.getRepository().setCheckout(data);
          this.checkout = data;
          return;
        }
      }
    } else {
      // 4. Try to take checkout from local storage
      let checkoutModel: ICheckoutModel | null;
      checkoutModel = this.checkoutRepositoryManager
        .getRepository()
        .getCheckout();

      if (checkoutModel) {
        this.checkout = checkoutModel;
        return;
      }
    }
  };
}
