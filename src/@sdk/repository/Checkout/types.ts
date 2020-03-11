import { LocalRepository } from "../LocalRepository";
import { ICheckoutModel } from "../types";

export interface ICheckoutRepositoryManager {
  getRepository: () => LocalRepository;
  onCheckoutChangeListener: (f: (checkout: ICheckoutModel) => any) => void;
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
}
