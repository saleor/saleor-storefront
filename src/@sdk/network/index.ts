import ApolloClient from "apollo-client";

import { getAuthToken } from "@sdk/auth";
import { Checkout } from "@sdk/fragments/types/Checkout";
import { OrderDetail } from "@sdk/fragments/types/OrderDetail";
import { Payment } from "@sdk/fragments/types/Payment";
import * as CheckoutMutations from "@sdk/mutations/checkout";
import {
  AddCheckoutPromoCode,
  AddCheckoutPromoCodeVariables,
} from "@sdk/mutations/types/AddCheckoutPromoCode";
import {
  CompleteCheckout,
  CompleteCheckoutVariables,
} from "@sdk/mutations/types/CompleteCheckout";
import {
  CreateCheckout,
  CreateCheckoutVariables,
} from "@sdk/mutations/types/CreateCheckout";
import {
  CreateCheckoutPayment,
  CreateCheckoutPaymentVariables,
} from "@sdk/mutations/types/CreateCheckoutPayment";
import {
  RemoveCheckoutPromoCode,
  RemoveCheckoutPromoCodeVariables,
} from "@sdk/mutations/types/RemoveCheckoutPromoCode";
import {
  UpdateCheckoutBillingAddress,
  UpdateCheckoutBillingAddressVariables,
} from "@sdk/mutations/types/UpdateCheckoutBillingAddress";
import {
  UpdateCheckoutBillingAddressWithEmail,
  UpdateCheckoutBillingAddressWithEmailVariables,
} from "@sdk/mutations/types/UpdateCheckoutBillingAddressWithEmail";
import {
  UpdateCheckoutLine,
  UpdateCheckoutLineVariables,
} from "@sdk/mutations/types/UpdateCheckoutLine";
import {
  UpdateCheckoutShippingAddress,
  UpdateCheckoutShippingAddressVariables,
} from "@sdk/mutations/types/UpdateCheckoutShippingAddress";
import {
  UpdateCheckoutShippingMethod,
  UpdateCheckoutShippingMethodVariables,
} from "@sdk/mutations/types/UpdateCheckoutShippingMethod";
import * as CheckoutQueries from "@sdk/queries/checkout";
import * as ShopQueries from "@sdk/queries/shop";
import { CheckoutDetails } from "@sdk/queries/types/CheckoutDetails";
import {
  CheckoutProductVariants,
  CheckoutProductVariants_productVariants,
} from "@sdk/queries/types/CheckoutProductVariants";
import {
  GetShopPaymentGateways,
  GetShopPaymentGateways_shop_availablePaymentGateways,
} from "@sdk/queries/types/GetShopPaymentGateways";
import { UserCheckoutDetails } from "@sdk/queries/types/UserCheckoutDetails";
import {
  ICheckoutAddress,
  ICheckoutModel,
  ICheckoutModelLine,
  IOrderModel,
  IPaymentModel,
} from "@sdk/repository";
import { CountryCode } from "@sdk/types/globalTypes";
import { filterNotEmptyArrayItems } from "@sdk/utils";

import { INetworkManager } from "./types";

export class NetworkManager implements INetworkManager {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  getCheckout = async (checkoutToken: string | null) => {
    let checkout: Checkout | null;
    try {
      checkout = await new Promise((resolve, reject) => {
        if (this.isLoggedIn()) {
          const observable = this.client.watchQuery<UserCheckoutDetails, any>({
            fetchPolicy: "network-only",
            query: CheckoutQueries.userCheckoutDetails,
          });
          observable.subscribe(
            result => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.me?.checkout);
              }
            },
            error => {
              reject(error);
            }
          );
        } else if (checkoutToken) {
          const observable = this.client.watchQuery<CheckoutDetails, any>({
            fetchPolicy: "network-only",
            query: CheckoutQueries.checkoutDetails,
            variables: {
              token: checkoutToken,
            },
          });
          observable.subscribe(
            result => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.checkout);
              }
            },
            error => {
              reject(error);
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
        const observable = this.client.watchQuery<CheckoutProductVariants, any>(
          {
            query: CheckoutQueries.checkoutProductVariants,
            variables: {
              ids: idsOfMissingVariants,
            },
          }
        );
        variants = await new Promise((resolve, reject) => {
          observable.subscribe(
            result => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.productVariants);
              }
            },
            error => {
              reject(error);
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
        const observable = this.client.watchQuery<GetShopPaymentGateways, any>({
          fetchPolicy: "network-only",
          query: ShopQueries.getShopPaymentGateways,
        });
        observable.subscribe(
          result => {
            const { data, errors } = result;
            if (errors?.length) {
              reject(errors);
            } else {
              resolve(data.shop.availablePaymentGateways);
            }
          },
          error => {
            reject(error);
          }
        );
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
      const variables = {
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
      };
      const { data, errors } = await this.client.mutate<
        CreateCheckout,
        CreateCheckoutVariables
      >({
        mutation: CheckoutMutations.createCheckoutMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutCreate?.errors.length) {
        return {
          error: data?.checkoutCreate?.errors,
        };
      } else if (data?.checkoutCreate?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkoutCreate.checkout),
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
        const { data, errors } = await this.client.mutate<
          UpdateCheckoutLine,
          UpdateCheckoutLineVariables
        >({
          mutation: CheckoutMutations.updateCheckoutLineMutation,
          variables: {
            checkoutId,
            lines: alteredLines,
          },
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        } else if (data?.checkoutLinesUpdate?.errors.length) {
          return {
            error: data?.checkoutLinesUpdate?.errors,
          };
        } else if (data?.checkoutLinesUpdate?.checkout) {
          return {
            data: this.constructCheckoutModel(
              data.checkoutLinesUpdate.checkout
            ),
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
      const variables = {
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
      };
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutShippingAddress,
        UpdateCheckoutShippingAddressVariables
      >({
        mutation: CheckoutMutations.updateCheckoutShippingAddressMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutEmailUpdate?.errors.length) {
        return {
          error: data?.checkoutEmailUpdate?.errors,
        };
      } else if (data?.checkoutShippingAddressUpdate?.errors.length) {
        return {
          error: data?.checkoutShippingAddressUpdate?.errors,
        };
      } else if (data?.checkoutShippingAddressUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutShippingAddressUpdate.checkout
          ),
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
      const variables = {
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
      };
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutBillingAddress,
        UpdateCheckoutBillingAddressVariables
      >({
        mutation: CheckoutMutations.updateCheckoutBillingAddressMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutBillingAddressUpdate?.errors.length) {
        return {
          error: data?.checkoutBillingAddressUpdate?.errors,
        };
      } else if (data?.checkoutBillingAddressUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutBillingAddressUpdate.checkout
          ),
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
      const variables = {
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
      };
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutBillingAddressWithEmail,
        UpdateCheckoutBillingAddressWithEmailVariables
      >({
        mutation:
          CheckoutMutations.updateCheckoutBillingAddressWithEmailMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutEmailUpdate?.errors.length) {
        return {
          error: data?.checkoutEmailUpdate?.errors,
        };
      } else if (data?.checkoutBillingAddressUpdate?.errors.length) {
        return {
          error: data?.checkoutBillingAddressUpdate?.errors,
        };
      } else if (data?.checkoutBillingAddressUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutBillingAddressUpdate.checkout
          ),
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
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutShippingMethod,
        UpdateCheckoutShippingMethodVariables
      >({
        mutation: CheckoutMutations.updateCheckoutShippingMethodMutation,
        variables: {
          checkoutId,
          shippingMethodId,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutShippingMethodUpdate?.errors.length) {
        return {
          error: data?.checkoutShippingMethodUpdate?.errors,
        };
      } else if (data?.checkoutShippingMethodUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutShippingMethodUpdate.checkout
          ),
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
      const { data, errors } = await this.client.mutate<
        AddCheckoutPromoCode,
        AddCheckoutPromoCodeVariables
      >({
        mutation: CheckoutMutations.addCheckoutPromoCode,
        variables: { checkoutId, promoCode },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutAddPromoCode?.errors.length) {
        return {
          error: data?.checkoutAddPromoCode?.errors,
        };
      } else if (data?.checkoutAddPromoCode?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkoutAddPromoCode.checkout),
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
      const { data, errors } = await this.client.mutate<
        RemoveCheckoutPromoCode,
        RemoveCheckoutPromoCodeVariables
      >({
        mutation: CheckoutMutations.removeCheckoutPromoCode,
        variables: { checkoutId, promoCode },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutRemovePromoCode?.errors.length) {
        return {
          error: data?.checkoutRemovePromoCode?.errors,
        };
      } else if (data?.checkoutRemovePromoCode?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutRemovePromoCode.checkout
          ),
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
      const variables = {
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
      };
      const { data, errors } = await this.client.mutate<
        CreateCheckoutPayment,
        CreateCheckoutPaymentVariables
      >({
        mutation: CheckoutMutations.createCheckoutPaymentMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutPaymentCreate?.errors.length) {
        return {
          error: data?.checkoutPaymentCreate?.errors,
        };
      } else if (data?.checkoutPaymentCreate?.payment) {
        return {
          data: this.constructPaymentModel(data.checkoutPaymentCreate.payment),
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
      const { data, errors } = await this.client.mutate<
        CompleteCheckout,
        CompleteCheckoutVariables
      >({
        mutation: CheckoutMutations.completeCheckoutMutation,
        variables: { checkoutId },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutComplete?.errors.length) {
        return {
          error: data?.checkoutComplete?.errors,
        };
      } else if (data?.checkoutComplete?.order) {
        return {
          data: this.constructOrderModel(data.checkoutComplete.order),
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

  private isLoggedIn = () => {
    return !!getAuthToken();
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
