import { Repository } from "./Repository";
import { ICheckoutModel, ILocalRepository, LocalStorageItems } from "./types";

export class LocalRepository extends Repository implements ILocalRepository {
  getCheckoutToken(): string | null {
    return this.retrieveItem(LocalStorageItems.CHECKOUT_TOKEN);
  }
  setCheckoutToken(token: string | null): void {
    this.saveItem(LocalStorageItems.CHECKOUT_TOKEN, token);
  }
  getCheckout(): ICheckoutModel | null {
    return this.retrieveObject(LocalStorageItems.CHECKOUT);
  }
  setCheckout(checkout: ICheckoutModel | null): void {
    this.saveObject(LocalStorageItems.CHECKOUT, checkout);
  }
}
