import { Repository } from "./Repository";
import {
  ICheckoutModel,
  IJobsModel,
  ILocalRepository,
  IPaymentModel,
  LocalStorageItems,
} from "./types";

export class LocalRepository extends Repository implements ILocalRepository {
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
