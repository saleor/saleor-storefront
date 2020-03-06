import { ICheckoutModel, ILocalRepository } from "./types";

class Repository {
  protected saveObject<T extends object>(name: string, object: T): void {
    localStorage.setItem(name, JSON.stringify(object));
  }
  protected getObject<T extends object>(name: string): T {
    return JSON.parse(localStorage.getItem(name) || "");
  }
}

export class LocalRepository extends Repository implements ILocalRepository {
  getCheckout(): ICheckoutModel {
    return this.getObject("checkout");
  }
  setCheckout(checkout: ICheckoutModel): void {
    this.saveObject("checkout", checkout);
  }
}
