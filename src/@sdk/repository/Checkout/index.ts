import { Checkout_shippingAddress } from "@sdk/fragments/types/Checkout";

import { LocalRepository } from "../LocalRepository";
import { ICheckoutAddress, ICheckoutModel, LocalStorageItems } from "../types";
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
        id: undefined,
        quantity,
        totalPrice: undefined,
        variant: {
          attributes: undefined,
          id: variantId,
          isAvailable: undefined,
          name: undefined,
          pricing: undefined,
          product: undefined,
          sku: undefined,
          stockQuantity: undefined,
        },
      };
      alteredLines.push(variant);
    }
    const alteredCheckout = checkout
      ? {
          ...checkout,
          lines: alteredLines,
        }
      : {
          billingAddress: undefined,
          email: undefined,
          id: undefined,
          lines: alteredLines,
          shippingAddress: undefined,
          shippingPrice: undefined,
          subtotalPrice: undefined,
          totalPrice: undefined,
        };
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  removeItemFromCart = (checkout: ICheckoutModel | null, variantId: string) => {
    const lines = checkout?.lines || [];
    const variant = lines.find(variant => variant.variant.id === variantId);
    const alteredLines = lines.filter(
      variant => variant.variant.id !== variantId
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
      : {
          billingAddress: undefined,
          email: undefined,
          id: undefined,
          lines: alteredLines,
          shippingAddress: undefined,
          shippingPrice: undefined,
          subtotalPrice: undefined,
          totalPrice: undefined,
        };
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  subtractItemFromCart = (
    checkout: ICheckoutModel | null,
    variantId: string
  ) => {
    const lines = checkout?.lines || [];
    const variant = lines.find(variant => variant.variant.id === variantId);
    const alteredLines = lines.filter(
      variant => variant.variant.id !== variantId
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
      : {
          billingAddress: undefined,
          email: undefined,
          id: undefined,
          lines: alteredLines,
          shippingAddress: undefined,
          shippingPrice: undefined,
          subtotalPrice: undefined,
          totalPrice: undefined,
        };
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  updateItemInCart = (
    checkout: ICheckoutModel | null,
    variantId: string,
    quantity: number
  ) => {
    const lines = checkout?.lines || [];
    const variant = lines.find(variant => variant.variant.id === variantId);
    const alteredLines = lines.filter(
      variant => variant.variant.id !== variantId
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
      : {
          billingAddress: undefined,
          email: undefined,
          id: undefined,
          lines: alteredLines,
          shippingAddress: undefined,
          shippingPrice: undefined,
          subtotalPrice: undefined,
          totalPrice: undefined,
        };
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  setShippingAddress = (
    checkout: ICheckoutModel | null,
    shippingAddress: ICheckoutAddress,
    email?: string
  ) => {
    const alteredCheckout = checkout
      ? {
          ...checkout,
          email,
          shippingAddress,
        }
      : {
          billingAddress: undefined,
          email,
          id: undefined,
          lines: undefined,
          shippingAddress,
          shippingPrice: undefined,
          subtotalPrice: undefined,
          totalPrice: undefined,
        };
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  setBillingAddress = (
    checkout: ICheckoutModel | null,
    billingAddress: ICheckoutAddress
  ) => {
    const alteredCheckout = checkout
      ? {
          ...checkout,
          billingAddress,
        }
      : {
          billingAddress,
          email: undefined,
          id: undefined,
          lines: undefined,
          shippingAddress: undefined,
          shippingPrice: undefined,
          subtotalPrice: undefined,
          totalPrice: undefined,
        };
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };
}
