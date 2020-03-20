import { APIProxy } from "@sdk/api/APIProxy";
import { Checkout } from "@sdk/fragments/types/Checkout";
import { CheckoutProductVariants_productVariants } from "@sdk/queries/types/CheckoutProductVariants";
import { ICheckoutModel, ICheckoutModelLine } from "@sdk/repository";

import { ICheckoutNetworkManager } from "./types";

export class CheckoutNetworkManager implements ICheckoutNetworkManager {
  private apiProxy: APIProxy;

  constructor(apiProxy: APIProxy) {
    this.apiProxy = apiProxy;
  }

  getCheckout = async (checkoutToken: string | null) => {
    let checkout: Checkout | null;
    try {
      checkout = await new Promise((resolve, reject) => {
        if (this.apiProxy.isLoggedIn()) {
          this.apiProxy.getUserCheckout(null, {
            onError: error => {
              reject(error);
            },
            onUpdate: data => {
              resolve(data);
            },
          });
        } else if (checkoutToken) {
          this.apiProxy.getCheckoutDetails(
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
        } else {
          resolve(null);
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
              .map(item => {
                const itemVariant = item?.variant;

                return {
                  id: item!.id,
                  quantity: item!.quantity,
                  totalPrice: item?.totalPrice,
                  variant: {
                    id: itemVariant!.id,
                    name: itemVariant?.name,
                    pricing: itemVariant?.pricing,
                    product: itemVariant?.product,
                    sku: itemVariant?.sku,
                    stockQuantity: itemVariant?.stockQuantity,
                  },
                };
              }),
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

  getRefreshedCheckoutLines = async (
    checkoutlines: ICheckoutModelLine[] | null
  ) => {
    const idsOfMissingVariants = checkoutlines
      ?.filter(line => !line.variant || !line.totalPrice)
      .map(line => line.variant.id);
    const linesWithProperVariant =
      checkoutlines?.filter(line => line.variant && line.totalPrice) || [];

    let variants: CheckoutProductVariants_productVariants | null | undefined;
    if (idsOfMissingVariants && idsOfMissingVariants.length) {
      try {
        variants = await new Promise((resolve, reject) => {
          this.apiProxy.getCheckoutProductVariants(
            {
              ids: idsOfMissingVariants,
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
        });
      } catch (errors) {
        return {
          data: null,
          errors,
        };
      }
    }

    const linesWithMissingVariantUpdated = variants
      ? variants.edges.map(edge => {
          const existingLine = checkoutlines?.find(
            line => line.variant.id === edge.node.id
          );
          const variantPricing = edge.node.pricing?.price;
          const totalPrice = variantPricing
            ? {
                gross: {
                  ...variantPricing.gross,
                  amount:
                    variantPricing.gross.amount * (existingLine?.quantity || 0),
                },
                net: {
                  ...variantPricing.net,
                  amount:
                    variantPricing.net.amount * (existingLine?.quantity || 0),
                },
              }
            : null;

          return {
            id: existingLine?.id,
            quantity: existingLine?.quantity || 0,
            totalPrice,
            variant: {
              id: edge.node.id,
              name: edge.node.name,
              pricing: edge.node.pricing,
              product: edge.node.product,
              sku: edge.node.sku,
              stockQuantity: edge.node.stockQuantity,
            },
          };
        })
      : [];

    const linesWithProperVariantUpdated = linesWithProperVariant.map(line => {
      const variantPricing = line.variant.pricing?.price;
      const totalPrice = variantPricing
        ? {
            gross: {
              ...variantPricing.gross,
              amount: variantPricing.gross.amount * line.quantity,
            },
            net: {
              ...variantPricing.net,
              amount: variantPricing.net.amount * line.quantity,
            },
          }
        : null;

      return {
        id: line.id,
        quantity: line.quantity,
        totalPrice,
        variant: line.variant,
      };
    });

    return {
      data: [
        ...linesWithMissingVariantUpdated,
        ...linesWithProperVariantUpdated,
      ],
      errors: null,
    };
  };

  createCheckout = async (
    email: string,
    shippingAddress: object,
    billingAddress: object,
    lines: Array<{ variantId: string; quantity: number }>
  ) => {
    const { data } = await this.apiProxy.setCreateCheckout({
      checkoutInput: {
        billingAddress,
        email,
        lines,
        shippingAddress,
      },
    });

    if (data?.errors && data.errors.length) {
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
            .map(item => {
              const itemVariant = item?.variant;

              return {
                id: item!.id,
                quantity: item!.quantity,
                totalPrice: item?.totalPrice,
                variant: {
                  id: itemVariant!.id,
                  name: itemVariant?.name,
                  pricing: itemVariant?.pricing,
                  product: itemVariant?.product,
                  sku: itemVariant?.sku,
                  stockQuantity: itemVariant?.stockQuantity,
                },
              };
            }),
          shippingAddress,
        },
        errors: null,
      };
    } else {
      return { data: null, errors: null };
    }
  };

  setCartItem = async (checkout: ICheckoutModel) => {
    const checkoutId = checkout.id;
    const lines = checkout.lines;

    if (checkoutId && lines) {
      const alteredLines = lines.map(line => ({
        quantity: line.quantity,
        variantId: line.variant.id,
      }));

      const { data } = await this.apiProxy.setCheckoutLine({
        checkoutId,
        lines: alteredLines,
      });

      if (data?.errors && data.errors.length) {
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
              .map(item => {
                const itemVariant = item?.variant;

                return {
                  id: item!.id,
                  quantity: item!.quantity,
                  totalPrice: item?.totalPrice,
                  variant: {
                    id: itemVariant!.id,
                    name: itemVariant?.name,
                    pricing: itemVariant?.pricing,
                    product: itemVariant?.product,
                    sku: itemVariant?.sku,
                    stockQuantity: itemVariant?.stockQuantity,
                  },
                };
              }),
            shippingAddress,
          },
          errors: null,
        };
      }
    }
    return { data: null, errors: null };
  };

  setBillingAddress = async () => ({ data: null, errors: null });
  setShippingAddress = async () => ({ data: null, errors: null });
  setShippingAsBillingAddress = async () => ({ data: null, errors: null });
}
