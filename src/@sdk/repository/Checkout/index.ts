import { LocalRepository } from "../LocalRepository";
import { ICheckoutModel, LocalStorageItems } from "../types";
import { ICheckoutRepositoryManager } from "./types";

export class CheckoutRepositoryManager implements ICheckoutRepositoryManager {
  private repository: LocalRepository;

  constructor(repository: LocalRepository) {
    this.repository = repository;
  }

  getRepository = () => {
    return this.repository;
  };

  addOnCheckoutChangeListener = (func: (checkout: ICheckoutModel) => any) => {
    this.repository.subscribeToChange(LocalStorageItems.CHECKOUT, func);
  };

  addItemToCart = (
    checkout: ICheckoutModel | null,
    variantId: string,
    quantity: number
  ) => {
    const lines = checkout?.lines || [];
    let variant = lines.find(variant => variant.variantId === variantId);
    const alteredLines = lines.filter(
      variant => variant.variantId !== variantId
    );
    const newVariantQuantity = variant ? variant.quantity + quantity : quantity;
    if (variant) {
      variant.quantity = newVariantQuantity;
      alteredLines.push(variant);
    } else {
      variant = { variantId, quantity };
      alteredLines.push(variant);
    }
    const alteredCheckout = checkout
      ? {
          ...checkout,
          lines: alteredLines,
        }
      : null;
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  removeItemFromCart = (checkout: ICheckoutModel | null, variantId: string) => {
    const lines = checkout?.lines || [];
    const variant = lines.find(variant => variant.variantId === variantId);
    const alteredLines = lines.filter(
      variant => variant.variantId !== variantId
    );
    if (variant) {
      variant.quantity = 0;
      alteredLines.push(variant);
    }
    const alteredCheckout = checkout
      ? {
          ...checkout,
          lines: alteredLines,
        }
      : null;
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  subtractItemFromCart = (
    checkout: ICheckoutModel | null,
    variantId: string
  ) => {
    const lines = checkout?.lines || [];
    const variant = lines.find(variant => variant.variantId === variantId);
    const alteredLines = lines.filter(
      variant => variant.variantId !== variantId
    );
    const newVariantQuantity = variant ? variant.quantity - 1 : 0;
    if (variant) {
      variant.quantity = newVariantQuantity;
      alteredLines.push(variant);
    }
    const alteredCheckout = checkout
      ? {
          ...checkout,
          lines: alteredLines,
        }
      : null;
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  updateItemInCart = (
    checkout: ICheckoutModel | null,
    variantId: string,
    quantity: number
  ) => {
    const lines = checkout?.lines || [];
    const variant = lines.find(variant => variant.variantId === variantId);
    const alteredLines = lines.filter(
      variant => variant.variantId !== variantId
    );
    if (variant) {
      variant.quantity = quantity;
      alteredLines.push(variant);
    }
    const alteredCheckout = checkout
      ? {
          ...checkout,
          lines: alteredLines,
        }
      : null;
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };
}
