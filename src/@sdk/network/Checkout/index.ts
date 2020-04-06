import { APIProxy } from "@sdk/api/APIProxy";
import { Checkout } from "@sdk/fragments/types/Checkout";
import { Payment } from "@sdk/fragments/types/Payment";
import { CheckoutProductVariants_productVariants } from "@sdk/queries/types/CheckoutProductVariants";
import {
  ICheckoutAddress,
  ICheckoutModel,
  ICheckoutModelLine,
  IPaymentModel,
} from "@sdk/repository";
import { CountryCode } from "@sdk/types/globalTypes";

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
            onError: (error) => {
              reject(error);
            },
            onUpdate: (data) => {
              resolve(data);
            },
          });
        } else if (checkoutToken) {
          this.apiProxy.getCheckoutDetails(
            {
              token: checkoutToken,
            },
            {
              onError: (error) => {
                reject(error);
              },
              onUpdate: (data) => {
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
      ?.filter((line) => !line.variant || !line.totalPrice)
      .map((line) => line.variant.id);
    const linesWithProperVariant =
      checkoutlines?.filter((line) => line.variant && line.totalPrice) || [];

    let variants: CheckoutProductVariants_productVariants | null | undefined;
    if (idsOfMissingVariants && idsOfMissingVariants.length) {
      try {
        variants = await new Promise((resolve, reject) => {
          this.apiProxy.getCheckoutProductVariants(
            {
              ids: idsOfMissingVariants,
            },
            {
              onError: (error) => {
                reject(error);
              },
              onUpdate: (data) => {
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
      ? variants.edges.map((edge) => {
          const existingLine = checkoutlines?.find(
            (line) => line.variant.id === edge.node.id
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

    const linesWithProperVariantUpdated = linesWithProperVariant.map((line) => {
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
    lines: Array<{ variantId: string; quantity: number }>,
    shippingAddress: ICheckoutAddress,
    billingAddress?: ICheckoutAddress
  ) => {
    const { data } = await this.apiProxy.setCreateCheckout({
      checkoutInput: {
        billingAddress: billingAddress
          ? {
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
            }
          : undefined,
        email,
        lines,
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
      },
    });

    if (data?.errors && data.errors.length) {
      return {
        data: null,
        errors: data?.errors,
      };
    }

    if (data?.checkout) {
      return {
        data: this.constructCheckoutModel(data.checkout),
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
      const alteredLines = lines.map((line) => ({
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
        return {
          data: this.constructCheckoutModel(data.checkout),
          errors: null,
        };
      }
    }
    return { data: null, errors: null };
  };

  setShippingAddress = async (checkout: ICheckoutModel) => {
    const checkoutId = checkout.id;
    const shippingAddress = checkout.shippingAddress;
    const email = checkout.email;

    if (checkoutId && shippingAddress && email) {
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

      if (data?.errors && data.errors.length) {
        return {
          data: null,
          errors: data.errors,
        };
      }

      if (data?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkout),
          errors: null,
        };
      }
    }
    return { data: null, errors: null };
  };

  setBillingAddress = async (checkout: ICheckoutModel) => {
    const checkoutId = checkout.id;
    const billingAddress = checkout.billingAddress;

    if (checkoutId && billingAddress) {
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

      if (data?.errors && data.errors.length) {
        return {
          data: null,
          errors: data.errors,
        };
      }

      if (data?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkout),
          errors: null,
        };
      }
    }
    return { data: null, errors: null };
  };

  setShippingMethod = async (checkout: ICheckoutModel) => {
    const checkoutId = checkout.id;
    const shippingMethodId = checkout.shippingMethod?.id;

    if (checkoutId && shippingMethodId) {
      const { data } = await this.apiProxy.setCheckoutShippingMethod({
        checkoutId,
        shippingMethodId,
      });

      if (data?.errors && data.errors.length) {
        return {
          data: null,
          errors: data.errors,
        };
      }

      if (data?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkout),
          errors: null,
        };
      }
    }
    return { data: null, errors: null };
  };

  createPayment = async (
    amount: number,
    checkout: ICheckoutModel,
    payment: IPaymentModel
  ) => {
    const checkoutId = checkout.id;
    const paymentGateway = payment.gateway;
    const paymentToken = payment.token;
    const billingAddress = checkout.billingAddress;

    if (
      checkoutId &&
      paymentGateway &&
      paymentToken &&
      amount !== null &&
      amount !== undefined &&
      billingAddress
    ) {
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

      if (data?.errors && data.errors.length) {
        return {
          data: null,
          errors: data.errors,
        };
      }

      if (data?.payment) {
        return {
          data: this.constructPaymentModel(data.payment),
          errors: null,
        };
      }
    }

    return { data: null, errors: null };
  };

  private constructCheckoutModel = ({
    id,
    token,
    email,
    shippingAddress,
    billingAddress,
    lines,
    availableShippingMethods,
    shippingMethod,
    availablePaymentGateways,
  }: Checkout): ICheckoutModel => ({
    availablePaymentGateways: availablePaymentGateways
      ? availablePaymentGateways.filter(function notEmpty<TValue>(
          value: TValue | null | undefined
        ): value is TValue {
          return value !== null && value !== undefined;
        })
      : [],
    availableShippingMethods: availableShippingMethods
      ? availableShippingMethods.filter(function notEmpty<TValue>(
          value: TValue | null | undefined
        ): value is TValue {
          return value !== null && value !== undefined;
        })
      : [],
    billingAddress,
    email,
    id,
    lines: lines
      ?.filter((item) => item?.quantity && item.variant.id)
      .map((item) => {
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
}
