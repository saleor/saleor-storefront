import { NamedObservable } from "../NamedObservable";
import {
  ICheckoutModel,
  ILocalStorageHandler,
  IPaymentModel,
  LocalStorageItems,
} from "./types";

class LocalStorageHandlerProxy extends NamedObservable<LocalStorageItems> {
  protected saveItem(name: LocalStorageItems, item: string | null): void {
    if (item) {
      localStorage.setItem(name, item);
    } else {
      localStorage.removeItem(name);
    }
    this.notifyChange(name, item);
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
    this.notifyChange(name, object);
  }
  protected retrieveObject<T extends object>(
    name: LocalStorageItems
  ): T | null {
    const item = localStorage.getItem(name);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }
}

export class LocalStorageHandler extends LocalStorageHandlerProxy
  implements ILocalStorageHandler {
  getCheckout(): ICheckoutModel | null {
    return this.retrieveObject(LocalStorageItems.CHECKOUT);
  }
  setCheckout(checkout: ICheckoutModel | null): void {
    this.saveObject(LocalStorageItems.CHECKOUT, checkout);
  }
  getPayment(): IPaymentModel | null {
    return this.retrieveObject(LocalStorageItems.PAYMENT);
  }
  setPayment(payment: IPaymentModel | null): void {
    this.saveObject(LocalStorageItems.PAYMENT, payment);
  }
  getJobs(): {
    [key: string]: { [key: string]: boolean };
  } | null {
    return this.retrieveObject(LocalStorageItems.JOB_QUEUE_CHECKOUT);
  }
  setJobs(jobs: { [key: string]: { [key: string]: boolean } } | null): void {
    return this.saveObject(LocalStorageItems.JOB_QUEUE_CHECKOUT, jobs);
  }
}
