import { CreateCheckout_checkoutCreate_checkout_shippingAddress } from "@saleor/sdk/mutations/gqlTypes/CreateCheckout";

export type AddressInterface = Omit<
  CreateCheckout_checkoutCreate_checkout_shippingAddress,
  "__typename"
>;
