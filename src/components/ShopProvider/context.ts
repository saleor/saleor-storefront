import { createContext } from "react";

import { getShop_shop } from "./types/getShop";

export const defaultCountry = {
  code: "US",
  country: "United States of America"
};

export const ShopContext = createContext<getShop_shop>({
  countries: [],
  defaultCountry,
  geolocalization: {
    country: defaultCountry
  }
});
