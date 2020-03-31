import { LocalRepository } from "../LocalRepository";
import { ICheckoutAddress, ICheckoutModel } from "../types";

export interface ICheckoutRepositoryManager {
  getRepository: () => LocalRepository;
  addOnCheckoutChangeListener: (f: (checkout: ICheckoutModel) => any) => void;
  addItemToCart: (
    checkout: ICheckoutModel | null,
    variantId: string,
    quantity: number
  ) => ICheckoutModel | null;
  removeItemFromCart: (
    checkout: ICheckoutModel | null,
    variantId: string
  ) => ICheckoutModel | null;
  subtractItemFromCart: (
    checkout: ICheckoutModel | null,
    variantId: string
  ) => ICheckoutModel | null;
  updateItemInCart: (
    checkout: ICheckoutModel | null,
    variantId: string,
    quantity: number
  ) => ICheckoutModel | null;
  setShippingAddress: (
    checkout: ICheckoutModel | null,
    shippingAddress: ICheckoutAddress,
    email?: string
  ) => ICheckoutModel | null;
  setBillingAddress: (
    checkout: ICheckoutModel | null,
    shippingAddress: ICheckoutAddress
  ) => ICheckoutModel | null;
}
