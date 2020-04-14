import { LocalRepository } from "../LocalRepository";
import {
  ICheckoutAddress,
  ICheckoutModel,
  IPaymentCreditCard,
  IPaymentModel,
} from "../types";

export interface ICheckoutRepositoryManager {
  getRepository: () => LocalRepository;
  addItemToCart: (variantId: string, quantity: number) => ICheckoutModel | null;
  removeItemFromCart: (variantId: string) => ICheckoutModel | null;
  subtractItemFromCart: (variantId: string) => ICheckoutModel | null;
  updateItemInCart: (
    variantId: string,
    quantity: number
  ) => ICheckoutModel | null;
  setShippingAddress: (
    shippingAddress: ICheckoutAddress,
    email?: string
  ) => ICheckoutModel | null;
  setBillingAddress: (
    billingAddress: ICheckoutAddress,
    billingAsShipping?: boolean
  ) => ICheckoutModel | null;
  setShippingMethod: (shippingMethodId: string) => ICheckoutModel | null;
  setPaymentGatewayData: (
    gateway: string,
    token: string,
    creditCard?: IPaymentCreditCard
  ) => IPaymentModel | null;
}
