import { SaleorState } from "@sdk/state";

import { LocalRepository } from "../LocalRepository";
import { ICheckoutRepositoryManager } from "./types";

export class CheckoutRepositoryManager implements ICheckoutRepositoryManager {
  private repository: LocalRepository;
  private saleorState: SaleorState;

  constructor(repository: LocalRepository, saleorState: SaleorState) {
    this.repository = repository;
    this.saleorState = saleorState;
  }

  getRepository = () => {
    return this.repository;
  };

  addItemToCart = (variantId: string, quantity: number) => {
    const lines = this.saleorState.checkout?.lines || [];
    let variant = lines.find(variant => variant.variant.id === variantId);
    const alteredLines = lines.filter(
      variant => variant.variant.id !== variantId
    );
    const newVariantQuantity = variant ? variant.quantity + quantity : quantity;
    if (variant) {
      variant.quantity = newVariantQuantity;
      alteredLines.push(variant);
    } else {
      variant = {
        quantity,
        variant: {
          id: variantId,
        },
      };
      alteredLines.push(variant);
    }
    const alteredCheckout = this.saleorState.checkout
      ? {
          ...this.saleorState.checkout,
          lines: alteredLines,
        }
      : {
          lines: alteredLines,
        };
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  removeItemFromCart = (variantId: string) => {
    const lines = this.saleorState.checkout?.lines || [];
    const variant = lines.find(variant => variant.variant.id === variantId);
    const alteredLines = lines.filter(
      variant => variant.variant.id !== variantId
    );
    if (variant) {
      variant.quantity = 0;
      alteredLines.push(variant);
    }
    const alteredCheckout = this.saleorState.checkout
      ? {
          ...this.saleorState.checkout,
          lines: alteredLines,
        }
      : {
          lines: alteredLines,
        };
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  subtractItemFromCart = (variantId: string) => {
    const lines = this.saleorState.checkout?.lines || [];
    const variant = lines.find(variant => variant.variant.id === variantId);
    const alteredLines = lines.filter(
      variant => variant.variant.id !== variantId
    );
    const newVariantQuantity = variant ? variant.quantity - 1 : 0;
    if (variant) {
      variant.quantity = newVariantQuantity;
      alteredLines.push(variant);
    }
    const alteredCheckout = this.saleorState.checkout
      ? {
          ...this.saleorState.checkout,
          lines: alteredLines,
        }
      : {
          lines: alteredLines,
        };
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  updateItemInCart = (variantId: string, quantity: number) => {
    const lines = this.saleorState.checkout?.lines || [];
    const variant = lines.find(variant => variant.variant.id === variantId);
    const alteredLines = lines.filter(
      variant => variant.variant.id !== variantId
    );
    if (variant) {
      variant.quantity = quantity;
      alteredLines.push(variant);
    }
    const alteredCheckout = this.saleorState.checkout
      ? {
          ...this.saleorState.checkout,
          lines: alteredLines,
        }
      : {
          lines: alteredLines,
        };
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };
}
