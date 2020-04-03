import { LocalRepository } from "../LocalRepository";
import { ICheckoutAddress, ICheckoutModel } from "../types";

export interface ICheckoutRepositoryManager {
  getRepository: () => LocalRepository;
  addOnCheckoutChangeListener: (f: (checkout: ICheckoutModel) => any) => void;
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
}
