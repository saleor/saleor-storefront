import { NamedObservable } from "../NamedObservable";
import {
  ICheckoutModel,
  IJobsModel,
  ILocalStorageHandler,
  IPaymentModel,
  LocalStorageItems,
} from "./types";

/**
 * Sets or removes data from local storage in one of the specified data format.
 * If data is set to null, then it is removed from local storage.
 * If needed, it stringify data for persistance in local storage or parse such data to be retrieved in desired format.
 */
class LocalStorageHandlerProxy extends NamedObservable<LocalStorageItems> {
  /**
   * Save string item to local storage.
   * @param name Unique key by which item is identified.
   * @param item String to be saved. If null, then item is completely removed from local storage.
   */
  protected saveItem(name: LocalStorageItems, item: string | null): void {
    if (item) {
      localStorage.setItem(name, item);
    } else {
      localStorage.removeItem(name);
    }
    this.notifyChange(name, item);
  }
  /**
   * Retrieve string item from local storage.
   * @param name Unique key by which item is identified.
   */
  protected retrieveItem(name: LocalStorageItems): string | null {
    return localStorage.getItem(name);
  }
  /**
   * Stringify object and saves it to local storage.
   * @param name Unique key by which object is identified.
   * @param item Object to be saved. If null, then object is completely removed from local storage.
   */
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
  /**
   * Retrieve item from local storage and parse it as object.
   * @param name Unique key by which object is identified.
   */
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
  getJobs(): IJobsModel | null {
    return this.retrieveObject(LocalStorageItems.JOB_QUEUE_CHECKOUT);
  }
  setJobs(jobs: IJobsModel | null): void {
    return this.saveObject(LocalStorageItems.JOB_QUEUE_CHECKOUT, jobs);
  }
}
