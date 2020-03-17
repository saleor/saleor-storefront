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
    subtractItemFromCart: boolean;
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
      subtractItemFromCart: false,
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
    this.checkoutRepositoryManager.addOnCheckoutChangeListener(checkout => {
      this.checkout = checkout;
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
    this.checkoutJobQueue.enqueueSetCartItem(
      loading => (this.loading.addItemToCart = loading),
      error => this.errors.concat(error)
    );
  };

  load = async () => {
    await this.provideData();
  };

  removeItemFromCart = async (variantId: string) => {
    await this.provideData();

    // 1. save in local storage
    this.checkoutRepositoryManager.removeItemFromCart(this.checkout, variantId);

    // 2. save online if possible (if checkout id available)
    this.checkoutJobQueue.enqueueSetCartItem(
      loading => (this.loading.removeItemFromCart = loading),
      error => this.errors.concat(error)
    );
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
    this.checkoutJobQueue.enqueueSetCartItem(
      loading => (this.loading.subtractItemFromCart = loading),
      error => this.errors.concat(error)
    );
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
    this.checkoutJobQueue.enqueueSetCartItem(
      loading => (this.loading.updateItemInCart = loading),
      error => this.errors.concat(error)
    );
  };

  makeOrder = () => null;

  clearErrors = () => {
    this.errors = [];
  };

  private provideData = async () => {
    // 1.a. Try to take checkout from runtime memory (if exist on server - has checkout id)
    if (this.checkout?.id) {
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
        this.loading.load = false;
        return;
      }

      // 3. Try to take new created checkout from backend
      if (this.checkout) {
        const { email, shippingAddress, billingAddress, lines } = this.checkout;
        if (email && shippingAddress && billingAddress && lines) {
          const alteredLines = lines.map(item => ({
            quantity: item!.quantity,
            variantId: item?.variant!.id,
          }));

          const {
            data,
            errors,
          } = await this.checkoutNetworkManager.createCheckout(
            email,
            shippingAddress,
            billingAddress,
            alteredLines
          );

          if (errors) {
            this.errors = this.errors.concat(errors);
          } else if (data) {
            this.checkoutRepositoryManager.getRepository().setCheckout(data);
            this.checkout = data;
            this.loading.load = false;
            return;
          }
        }
      }

      this.loading.load = false;
    } else {
      // 1.b. Try to take checkout from runtime memory (if exist in memory - has any checkout data)
      if (this.checkout) {
        return;
      }

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
