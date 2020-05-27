import { LocalStorageHandler } from "../../helpers/LocalStorageHandler/LocalStorageHandler";
import { ICheckoutModel } from "../../helpers/LocalStorageHandler/types";

export interface ILocalStorageManager {
  getHandler: () => LocalStorageHandler;
  addItemToCart: (variantId: string, quantity: number) => ICheckoutModel | null;
  removeItemFromCart: (variantId: string) => ICheckoutModel | null;
  subtractItemFromCart: (variantId: string) => ICheckoutModel | null;
  updateItemInCart: (
    variantId: string,
    quantity: number
  ) => ICheckoutModel | null;
}
