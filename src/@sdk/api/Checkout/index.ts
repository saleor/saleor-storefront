import { CheckoutJobQueue } from "@sdk/jobs/Checkout";
import { CheckoutNetworkManager } from "@sdk/network";
import { ApolloErrorWithUserInput } from "@sdk/react/types";
import {
  CheckoutRepositoryManager,
  ICheckoutModel,
  LocalRepository,
} from "@sdk/repository";

import { APIProxy } from "../APIProxy";
import { ISaleorCheckoutAPI } from "./types";

// export interface SaleorCheckoutSDK {
//   errors: Array<ApolloErrorWithUserInput | any>;
//   checkout: ICheckoutModel | null;
//   loading: {
//     addItemToCart: boolean;
//     load: boolean;
//     removeItemFromCart: boolean;
//     setBillingAddress: boolean;
//     setShippingAddress: boolean;
//     setShippingAsBillingAddress: boolean;
//     subtractItemFromCart: boolean;
//     updateItemInCart: boolean;
//   };
//   promoCode: string | null;
//   shippingAsBilling: boolean;
//   addItemToCart: (variantId: string, quantity: number) => void;
//   load: () => void;
//   removeItemFromCart: (variantId: string) => void;
//   subtractItemFromCart: (variantId: string) => void;
//   setBillingAddress: () => void;
//   setShippingAddress: () => void;
//   setShippingAsBillingAddress: () => void;
//   updateItemInCart: (variantId: string, quantity: number) => void;
//   makeOrder: () => void;
// }

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
  }; // to change
  promoCode: string | null;
  shippingAsBilling: boolean;

  private checkoutRepositoryManager: CheckoutRepositoryManager;
  private checkoutNetworkManager: CheckoutNetworkManager;
  private checkoutJobQueue: CheckoutJobQueue;

  constructor(
    apiProxy: APIProxy,
    repository: LocalRepository,
    loadOnStart: boolean
  ) {
    this.errors = []; // One time error
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
    this.checkoutNetworkManager = new CheckoutNetworkManager(apiProxy);
    this.checkoutJobQueue = new CheckoutJobQueue(
      repository,
      this.checkoutNetworkManager
    );
    this.checkoutRepositoryManager.addOnCheckoutChangeListener(checkout => {
      this.checkout = checkout;
    });

    if (loadOnStart) {
      this.load();
    }
  }

  addItemToCart = async (variantId: string, quantity: number) => {
    await this.provideCheckout();

    // 1. save in local storage
    this.checkoutRepositoryManager.addItemToCart(
      this.checkout,
      variantId,
      quantity
    );

    // 2. save online if possible (if checkout id available)
    if (this.checkout?.lines) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.getRefreshedCheckoutLines(
        this.checkout.lines
      );

      if (errors) {
        this.errors = this.errors.concat(errors);
      } else {
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.checkout,
          lines: data,
        });
      }
    }
    if (this.checkout?.id) {
      this.checkoutJobQueue.enqueueSetCartItem(
        loading => (this.loading.addItemToCart = loading),
        error => this.errors.concat(error)
      );
    }
  };

  load = async () => {
    await this.provideCheckout(true);
  };

  removeItemFromCart = async (variantId: string) => {
    await this.provideCheckout();

    console.log(this.checkout);
    // 1. save in local storage
    this.checkoutRepositoryManager.removeItemFromCart(this.checkout, variantId);
    console.log(this.checkout);
    // 2. save online if possible (if checkout id available)
    if (this.checkout?.lines) {
      console.log(this.checkout);
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.getRefreshedCheckoutLines(
        this.checkout.lines
      );
      console.log(this.checkout);

      if (errors) {
        this.errors = this.errors.concat(errors);
      } else {
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.checkout,
          lines: data,
        });
      }
      console.log(this.checkout);
    }
    console.log(this.checkout);
    if (this.checkout?.id) {
      this.checkoutJobQueue.enqueueSetCartItem(
        loading => (this.loading.removeItemFromCart = loading),
        error => this.errors.concat(error)
      );
    }
  };

  setBillingAddress = () => null;

  setShippingAddress = () => null;

  setShippingAsBillingAddress = () => null;

  subtractItemFromCart = async (variantId: string) => {
    await this.provideCheckout();

    // 1. save in local storage
    this.checkoutRepositoryManager.subtractItemFromCart(
      this.checkout,
      variantId
    );

    // 2. save online if possible (if checkout id available)
    if (this.checkout?.lines) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.getRefreshedCheckoutLines(
        this.checkout.lines
      );

      if (errors) {
        this.errors = this.errors.concat(errors);
      } else {
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.checkout,
          lines: data,
        });
      }
    }
    if (this.checkout?.id) {
      this.checkoutJobQueue.enqueueSetCartItem(
        loading => (this.loading.subtractItemFromCart = loading),
        error => this.errors.concat(error)
      );
    }
  };

  updateItemInCart = async (variantId: string, quantity: number) => {
    await this.provideCheckout();

    // 1. save in local storage
    this.checkoutRepositoryManager.updateItemInCart(
      this.checkout,
      variantId,
      quantity
    );

    // 2. save online if possible (if checkout id available)
    if (this.checkout?.lines) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.getRefreshedCheckoutLines(
        this.checkout.lines
      );

      if (errors) {
        this.errors = this.errors.concat(errors);
      } else {
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.checkout,
          lines: data,
        });
      }
    }
    if (this.checkout?.id) {
      this.checkoutJobQueue.enqueueSetCartItem(
        loading => (this.loading.updateItemInCart = loading),
        error => this.errors.concat(error)
      );
    }
  };

  makeOrder = () => null;

  clearErrors = () => {
    this.errors = [];
  };

  private isCheckoutCreatedOnline = () => this.checkout?.id;

  private provideCheckout = async (forceReload?: boolean) => {
    if (this.isCheckoutCreatedOnline() && !forceReload) {
      return;
    }

    if (navigator.onLine) {
      await this.provideCheckoutOnline();
    } else {
      this.provideCheckoutOffline(forceReload);
    }
  };

  private provideCheckoutOnline = async () => {
    // 1. Try to take checkout from backend database
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

    // 2.a. Try to take checkout from local storage
    if (!this.checkout) {
      let checkoutModel: ICheckoutModel | null;
      checkoutModel = this.checkoutRepositoryManager
        .getRepository()
        .getCheckout();

      if (checkoutModel) {
        this.checkout = checkoutModel;
      }
    }

    // 2.b. Try to take new created checkout from backend
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
  };

  private provideCheckoutOffline = (forceReload?: boolean) => {
    // 1. Try to take checkout from runtime memory (if exist in memory - has any checkout data)
    if (this.checkout && !forceReload) {
      return;
    }

    // 2. Try to take checkout from local storage
    let checkoutModel: ICheckoutModel | null;
    checkoutModel = this.checkoutRepositoryManager
      .getRepository()
      .getCheckout();

    if (checkoutModel) {
      this.checkout = checkoutModel;
      return;
    }
  };
}
