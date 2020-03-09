import { Checkout } from "@sdk/fragments/types/Checkout";
import { SaleorAPI } from "@sdk/index";

import { ICheckoutController } from "./types";

export class CheckoutController implements ICheckoutController {
  private api: SaleorAPI;

  constructor(api: SaleorAPI) {
    this.api = api;
  }

  getCheckout = async (checkoutToken: string | null) => {
    let checkout: Checkout | null;
    try {
      checkout = await new Promise((resolve, reject) => {
        if (this.api.isLoggedIn()) {
          this.api.getUserCheckout(null, {
            onError: error => {
              reject(error);
            },
            onUpdate: data => {
              resolve(data);
            },
          });
        } else if (checkoutToken) {
          this.api.getCheckoutDetails(
            {
              token: checkoutToken,
            },
            {
              onError: error => {
                reject(error);
              },
              onUpdate: data => {
                resolve(data);
              },
            }
          );
        }
      });

      if (checkout) {
        const { id, email, shippingAddress, billingAddress, lines } = checkout;
        return {
          data: {
            billingAddress,
            email,
            id,
            lines: lines
              ?.filter(item => item?.quantity && item.variant.id)
              .map(item => ({
                quantity: item!.quantity,
                variantId: item!.variant.id,
              })),
            shippingAddress,
          },
          errors: null,
        };
      } else {
        return {
          data: null,
          errors: null,
        };
      }
    } catch (errors) {
      return {
        data: null,
        errors,
      };
    }
  };

  createCheckout = async (
    email: string,
    shippingAddress: object,
    billingAddress: object,
    lines: Array<{ variantId: string; quantity: number }>
  ) => {
    const { data } = await this.api.setCreateCheckout({
      checkoutInput: {
        billingAddress,
        email,
        lines,
        shippingAddress,
      },
    });

    if (data?.errors) {
      return {
        data: null,
        errors: data?.errors,
      };
    }

    if (data?.checkout) {
      const {
        id,
        email,
        shippingAddress,
        billingAddress,
        lines,
      } = data?.checkout;

      return {
        data: {
          billingAddress,
          email,
          id,
          lines: lines
            ?.filter(item => item?.quantity && item.variant.id)
            .map(item => ({
              quantity: item!.quantity,
              variantId: item!.variant.id,
            })),
          shippingAddress,
        },
        errors: null,
      };
    } else {
      return { data: null, errors: null };
    }
  };

  setCartItem = async (
    checkoutId: string,
    variantId: string,
    quantity: number
  ) => {
    const { data } = await this.api.setCheckoutLine({
      checkoutId,
      lines: [{ variantId, quantity }],
    });

    if (data?.errors) {
      return {
        data: null,
        errors: data.errors,
      };
    }

    if (data?.checkout) {
      const {
        id,
        email,
        shippingAddress,
        billingAddress,
        lines,
      } = data?.checkout;

      return {
        data: {
          billingAddress,
          email,
          id,
          lines: lines
            ?.filter(item => item?.quantity && item.variant.id)
            .map(item => ({
              quantity: item!.quantity,
              variantId: item!.variant.id,
            })),
          shippingAddress,
        },
        errors: null,
      };
    } else {
      return { data: null, errors: null };
    }
  };

  setBillingAddress = async () => ({ data: null, errors: null });
  setShippingAddress = async () => ({ data: null, errors: null });
  setShippingAsBillingAddress = async () => ({ data: null, errors: null });
}
