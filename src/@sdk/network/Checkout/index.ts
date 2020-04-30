import { APIProxy } from "@sdk/api/APIProxy";
import { Checkout } from "@sdk/fragments/types/Checkout";
import { OrderDetail } from "@sdk/fragments/types/OrderDetail";
import { Payment } from "@sdk/fragments/types/Payment";
import { CheckoutProductVariants_productVariants } from "@sdk/queries/types/CheckoutProductVariants";
import { GetShopPaymentGateways_shop_availablePaymentGateways } from "@sdk/queries/types/GetShopPaymentGateways";
import {
  ICheckoutAddress,
  ICheckoutModel,
  ICheckoutModelLine,
  IOrderModel,
  IPaymentModel,
} from "@sdk/repository";
import { CountryCode } from "@sdk/types/globalTypes";
import { filterNotEmptyArrayItems } from "@sdk/utils";

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
            fetchPolicy: "network-only",
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
              fetchPolicy: "network-only",
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
        return {
          data: this.constructCheckoutModel(checkout),
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
    return {};
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
      } catch (error) {
        return {
          error,
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
              attributes: edge.node.attributes,
              id: edge.node.id,
              isAvailable: edge.node.isAvailable,
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
    };
  };

  getPaymentGateways = async () => {
    let paymentGateways:
      | GetShopPaymentGateways_shop_availablePaymentGateways[]
      | null;
    try {
      paymentGateways = await new Promise((resolve, reject) => {
        this.apiProxy.getShopPaymentGateways(null, {
          fetchPolicy: "network-only",
          onError: error => {
            reject(error);
          },
          onUpdate: data => {
            resolve(data);
          },
        });
      });

      if (paymentGateways) {
        return {
          data: paymentGateways,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
    return {};
  };

  createCheckout = async (
    email: string,
    lines: Array<{ variantId: string; quantity: number }>,
    shippingAddress?: ICheckoutAddress,
    billingAddress?: ICheckoutAddress
  ) => {
    try {
      const { data } = await this.apiProxy.setCreateCheckout({
        checkoutInput: {
          billingAddress: billingAddress && {
            city: billingAddress.city,
            companyName: billingAddress.companyName,
            country:
              CountryCode[
                billingAddress?.country?.code as keyof typeof CountryCode
              ],
            countryArea: billingAddress.countryArea,
            firstName: billingAddress.firstName,
            lastName: billingAddress.lastName,
            phone: billingAddress.phone,
            postalCode: billingAddress.postalCode,
            streetAddress1: billingAddress.streetAddress1,
            streetAddress2: billingAddress.streetAddress2,
          },
          email,
          lines,
          shippingAddress: shippingAddress && {
            city: shippingAddress.city,
            companyName: shippingAddress.companyName,
            country:
              CountryCode[
                shippingAddress?.country?.code as keyof typeof CountryCode
              ],
            countryArea: shippingAddress.countryArea,
            firstName: shippingAddress.firstName,
            lastName: shippingAddress.lastName,
            phone: shippingAddress.phone,
            postalCode: shippingAddress.postalCode,
            streetAddress1: shippingAddress.streetAddress1,
            streetAddress2: shippingAddress.streetAddress2,
          },
        },
      });

      if (data?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkout),
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
    return {};
  };

  setCartItem = async (checkout: ICheckoutModel) => {
    const checkoutId = checkout.id;
    const lines = checkout.lines;

    if (checkoutId && lines) {
      const alteredLines = lines.map(line => ({
        quantity: line.quantity,
        variantId: line.variant.id,
      }));

      try {
        const { data } = await this.apiProxy.setCheckoutLine({
          checkoutId,
          lines: alteredLines,
        });

        if (data?.checkout) {
          return {
            data: this.constructCheckoutModel(data.checkout),
          };
        }
      } catch (error) {
        return {
          error,
        };
      }
    }
    return {};
  };

  setShippingAddress = async (
    shippingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string
  ) => {
    try {
      const { data } = await this.apiProxy.setCheckoutShippingAddress({
        checkoutId,
        email,
        shippingAddress: {
          city: shippingAddress.city,
          companyName: shippingAddress.companyName,
          country:
            CountryCode[
              shippingAddress?.country?.code as keyof typeof CountryCode
            ],
          countryArea: shippingAddress.countryArea,
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          phone: shippingAddress.phone,
          postalCode: shippingAddress.postalCode,
          streetAddress1: shippingAddress.streetAddress1,
          streetAddress2: shippingAddress.streetAddress2,
        },
      });

      if (data?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkout),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  setBillingAddress = async (
    billingAddress: ICheckoutAddress,
    checkoutId: string
  ) => {
    try {
      const { data } = await this.apiProxy.setCheckoutBillingAddress({
        billingAddress: {
          city: billingAddress.city,
          companyName: billingAddress.companyName,
          country:
            CountryCode[
              billingAddress?.country?.code as keyof typeof CountryCode
            ],
          countryArea: billingAddress.countryArea,
          firstName: billingAddress.firstName,
          lastName: billingAddress.lastName,
          phone: billingAddress.phone,
          postalCode: billingAddress.postalCode,
          streetAddress1: billingAddress.streetAddress1,
          streetAddress2: billingAddress.streetAddress2,
        },
        checkoutId,
      });

      if (data?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkout),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  setBillingAddressWithEmail = async (
    billingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string
  ) => {
    try {
      const { data } = await this.apiProxy.setCheckoutBillingAddressWithEmail({
        billingAddress: {
          city: billingAddress.city,
          companyName: billingAddress.companyName,
          country:
            CountryCode[
              billingAddress?.country?.code as keyof typeof CountryCode
            ],
          countryArea: billingAddress.countryArea,
          firstName: billingAddress.firstName,
          lastName: billingAddress.lastName,
          phone: billingAddress.phone,
          postalCode: billingAddress.postalCode,
          streetAddress1: billingAddress.streetAddress1,
          streetAddress2: billingAddress.streetAddress2,
        },
        checkoutId,
        email,
      });

      if (data?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkout),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  setShippingMethod = async (shippingMethodId: string, checkoutId: string) => {
    try {
      const { data } = await this.apiProxy.setCheckoutShippingMethod({
        checkoutId,
        shippingMethodId,
      });

      if (data?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkout),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  addPromoCode = async (promoCode: string, checkoutId: string) => {
    try {
      const { data } = await this.apiProxy.setAddCheckoutPromoCode({
        checkoutId,
        promoCode,
      });

      if (data?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkout),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  removePromoCode = async (promoCode: string, checkoutId: string) => {
    try {
      const { data } = await this.apiProxy.setRemoveCheckoutPromoCode({
        checkoutId,
        promoCode,
      });

      if (data?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkout),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  createPayment = async (
    amount: number,
    checkoutId: string,
    paymentGateway: string,
    paymentToken: string,
    billingAddress: ICheckoutAddress
  ) => {
    try {
      const { data } = await this.apiProxy.setCreateCheckoutPayment({
        checkoutId,
        paymentInput: {
          amount,
          billingAddress: {
            city: billingAddress.city,
            companyName: billingAddress.companyName,
            country:
              CountryCode[
                billingAddress?.country?.code as keyof typeof CountryCode
              ],
            countryArea: billingAddress.countryArea,
            firstName: billingAddress.firstName,
            lastName: billingAddress.lastName,
            phone: billingAddress.phone,
            postalCode: billingAddress.postalCode,
            streetAddress1: billingAddress.streetAddress1,
            streetAddress2: billingAddress.streetAddress2,
          },
          gateway: paymentGateway,
          token: paymentToken,
        },
      });

      if (data?.payment) {
        return {
          data: this.constructPaymentModel(data.payment),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  completeCheckout = async (checkoutId: string) => {
    try {
      const { data } = await this.apiProxy.setCompleteCheckout({
        checkoutId,
      });

      if (data?.order) {
        return {
          data: this.constructOrderModel(data.order),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  private constructCheckoutModel = ({
    id,
    token,
    email,
    shippingAddress,
    billingAddress,
    discount,
    discountName,
    voucherCode,
    lines,
    availableShippingMethods,
    shippingMethod,
  }: Checkout): ICheckoutModel => ({
    availableShippingMethods: availableShippingMethods
      ? availableShippingMethods.filter(filterNotEmptyArrayItems)
      : [],
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
            attributes: itemVariant?.attributes,
            id: itemVariant!.id,
            isAvailable: itemVariant?.isAvailable,
            name: itemVariant?.name,
            pricing: itemVariant?.pricing,
            product: itemVariant?.product,
            sku: itemVariant?.sku,
            stockQuantity: itemVariant?.stockQuantity,
          },
        };
      }),
    promoCodeDiscount: {
      discount,
      discountName,
      voucherCode,
    },
    shippingAddress,
    shippingMethod,
    token,
  });

  private constructPaymentModel = ({
    id,
    gateway,
    token,
    creditCard,
  }: Payment): IPaymentModel => ({
    creditCard,
    gateway,
    id,
    token,
  });

  private constructOrderModel = ({
    id,
    token,
    number: orderNumber,
  }: OrderDetail): IOrderModel => ({
    id,
    number: orderNumber,
    token,
  });
}
