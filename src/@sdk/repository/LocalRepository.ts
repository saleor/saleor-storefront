import { ICheckoutModel, ILocalRepository, LocalStorageItems } from "./types";

class Repository {
  protected saveObject<T extends object>(
    name: LocalStorageItems,
    object: T
  ): void {
    localStorage.setItem(name, JSON.stringify(object));
  }
  protected retrieveObject<T extends object>(name: LocalStorageItems): T {
    return JSON.parse(localStorage.getItem(name) || "");
  }
}

export class LocalRepository extends Repository implements ILocalRepository {
  getCheckout(): ICheckoutModel {
    return this.retrieveObject(LocalStorageItems.CHECKOUT);
  }
  setCheckout(checkout: ICheckoutModel): void {
    this.saveObject(LocalStorageItems.CHECKOUT, checkout);
  }
}
