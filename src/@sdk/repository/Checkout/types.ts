import { LocalRepository } from "../LocalRepository";
import { ICheckoutModel } from "../types";

export interface ICheckoutRepositoryManager {
  getRepository: () => LocalRepository;
  addItemToCart: (variantId: string, quantity: number) => ICheckoutModel | null;
  removeItemFromCart: (variantId: string) => ICheckoutModel | null;
  subtractItemFromCart: (variantId: string) => ICheckoutModel | null;
  updateItemInCart: (
    variantId: string,
    quantity: number
  ) => ICheckoutModel | null;
}
