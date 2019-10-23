/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getShop
// ====================================================

export interface getShop_shop_defaultCountry {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface getShop_shop_countries {
  __typename: "CountryDisplay";
  /**
   * Country name.
   */
  country: string;
  /**
   * Country code.
   */
  code: string;
}

export interface getShop_shop_geolocalization_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface getShop_shop_geolocalization {
  __typename: "Geolocalization";
  /**
   * Country of the user acquired by his IP address.
   */
  country: getShop_shop_geolocalization_country | null;
}

export interface getShop_shop {
  __typename: "Shop";
  /**
   * Display prices with tax in store.
   */
  displayGrossPrices: boolean;
  /**
   * Shop's default country.
   */
  defaultCountry: getShop_shop_defaultCountry | null;
  /**
   * List of countries available in the shop.
   */
  countries: (getShop_shop_countries | null)[];
  /**
   * Customer's geolocalization data.
   */
  geolocalization: getShop_shop_geolocalization | null;
}

export interface getShop {
  /**
   * Return information about the shop.
   */
  shop: getShop_shop | null;
}
