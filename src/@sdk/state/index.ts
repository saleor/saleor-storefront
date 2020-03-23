import { NamedObservable } from "../helpers";
import { CheckoutNetworkManager } from "../network";
import { ApolloErrorWithUserInput } from "../react/types";
import {
  ICheckoutModel,
  LocalRepository,
  LocalStorageItems,
} from "../repository";
import { ISaleorState, StateItems } from "./types";

export class SaleorState extends NamedObservable<StateItems>
  implements ISaleorState {
  checkout: ICheckoutModel | null;
  promoCode: string | null;
  shippingAsBilling: boolean;

  private repository: LocalRepository;
  private checkoutNetworkManager: CheckoutNetworkManager;

  constructor(
    repository: LocalRepository,
    checkoutNetworkManager: CheckoutNetworkManager
  ) {
    super();
    this.repository = repository;
    this.checkoutNetworkManager = checkoutNetworkManager;

    this.checkout = null;
    this.promoCode = null;
    this.shippingAsBilling = false;

    repository.subscribeToChange(
      LocalStorageItems.CHECKOUT,
      this.updateCheckout
    );
  }

  provideCheckout = async (
    onError: (error: ApolloErrorWithUserInput | any) => any,
    forceReload?: boolean
  ) => {
    if (this.isCheckoutCreatedOnline() && !forceReload) {
      return;
    }

    if (navigator.onLine) {
      await this.provideCheckoutOnline(onError);
    } else {
      this.provideCheckoutOffline(forceReload);
    }
  };

  private updateCheckout = (checkout: ICheckoutModel | null) => {
    this.checkout = checkout;
    this.notifyChange(StateItems.CHECKOUT, this.checkout);
  };

  private isCheckoutCreatedOnline = () => this.checkout?.id;

  private provideCheckoutOnline = async (
    onError: (error: ApolloErrorWithUserInput | any) => any
  ) => {
    // 1. Try to take checkout from backend database
    const checkoutToken = this.repository.getCheckoutToken();

    const { data, errors } = await this.checkoutNetworkManager.getCheckout(
      checkoutToken
    );

    if (errors) {
      onError(errors);
    } else if (data) {
      this.repository.setCheckout(data);
      this.updateCheckout(data);
      return;
    }

    // 2.a. Try to take checkout from local storage
    if (!this.checkout) {
      let checkoutModel: ICheckoutModel | null;
      checkoutModel = this.repository.getCheckout();

      if (checkoutModel) {
        this.updateCheckout(checkoutModel);
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
          onError(errors);
        } else if (data) {
          this.repository.setCheckout(data);
          this.updateCheckout(data);
          return;
        }
      }
    }
  };

  private provideCheckoutOffline = (forceReload?: boolean) => {
    // 1. Try to take checkout from runtime memory (if exist in memory - has any checkout data)
    if (this.checkout && !forceReload) {
      return;
    }

    // 2. Try to take checkout from local storage
    let checkoutModel: ICheckoutModel | null;
    checkoutModel = this.repository.getCheckout();

    if (checkoutModel) {
      this.updateCheckout(checkoutModel);
      return;
    }
  };
}
