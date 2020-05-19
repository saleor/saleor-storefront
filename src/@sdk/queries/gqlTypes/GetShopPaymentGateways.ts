/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShopPaymentGateways
// ====================================================

export interface GetShopPaymentGateways_shop_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  /**
   * Gateway config key.
   */
  field: string;
  /**
   * Gateway config value for key.
   */
  value: string | null;
}

export interface GetShopPaymentGateways_shop_availablePaymentGateways {
  __typename: "PaymentGateway";
  /**
   * Payment gateway ID.
   */
  id: string;
  /**
   * Payment gateway name.
   */
  name: string;
  /**
   * Payment gateway client configuration.
   */
  config: GetShopPaymentGateways_shop_availablePaymentGateways_config[];
}

export interface GetShopPaymentGateways_shop {
  __typename: "Shop";
  /**
   * List of available payment gateways.
   */
  availablePaymentGateways: GetShopPaymentGateways_shop_availablePaymentGateways[];
}

export interface GetShopPaymentGateways {
  /**
   * Return information about the shop.
   */
  shop: GetShopPaymentGateways_shop;
}
