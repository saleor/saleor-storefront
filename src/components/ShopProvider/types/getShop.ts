/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getShop
// ====================================================

export interface getShop_shop_defaultCountry {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface getShop_shop_countries {
  __typename: "CountryDisplay";
  country: string;
  code: string;
}

export interface getShop_shop_geolocalization_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface getShop_shop_geolocalization {
  __typename: "Geolocalization";
  country: getShop_shop_geolocalization_country | null;
}

export interface getShop_shop {
  __typename: "Shop";
  defaultCountry: getShop_shop_defaultCountry | null;
  countries: (getShop_shop_countries | null)[];
  geolocalization: getShop_shop_geolocalization | null;
}

export interface getShop {
  shop: getShop_shop | null;
}
