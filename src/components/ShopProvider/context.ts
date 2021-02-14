import { GetShop_shop } from "@saleor/sdk/lib/queries/gqlTypes/GetShop";
import { createContext } from "react";

export const defaultCountry = {
  __typename: "CountryDisplay" as "CountryDisplay",
  code: "US",
  country: "United States of America",
};

export const defaultContext: GetShop_shop = {
  __typename: "Shop",
  countries: [],
  defaultCountry,
  displayGrossPrices: true,
};

export const ShopContext = createContext<GetShop_shop>(defaultContext);

ShopContext.displayName = "ShopContext";
