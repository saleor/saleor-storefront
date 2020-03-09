import { ICheckoutModel, ILocalRepository, LocalStorageItems } from "./types";

class Repository {
  protected saveItem(name: LocalStorageItems, item: string | null): void {
    if (item) {
      localStorage.setItem(name, item);
    } else {
      localStorage.removeItem(name);
    }
  }
  protected retrieveItem(name: LocalStorageItems): string | null {
    return localStorage.getItem(name);
  }
  protected saveObject<T extends object>(
    name: LocalStorageItems,
    object: T | null
  ): void {
    if (object) {
      localStorage.setItem(name, JSON.stringify(object));
    } else {
      localStorage.removeItem(name);
    }
  }
  protected retrieveObject<T extends object>(
    name: LocalStorageItems
  ): T | null {
    return JSON.parse(localStorage.getItem(name) || "");
  }
}

export class LocalRepository extends Repository implements ILocalRepository {
  getCheckoutToken(): string | null {
    return this.retrieveItem(LocalStorageItems.CHECKOUT_TOKEN);
  }
  setCheckoutToken(token: string): void {
    this.saveItem(LocalStorageItems.CHECKOUT_TOKEN, token);
  }
  getCheckout(): ICheckoutModel | null {
    return this.retrieveObject(LocalStorageItems.CHECKOUT);
  }
  setCheckout(checkout: ICheckoutModel): void {
    this.saveObject(LocalStorageItems.CHECKOUT, checkout);
  }
}
