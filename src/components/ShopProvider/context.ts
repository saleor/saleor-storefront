import { createContext } from "react";

import { ShopInterface } from "../../core/types";

export const ShopContext = createContext<ShopInterface>({
  countries: [],
  defaultCountry: {
    code: "US",
    country: "United States of America"
  },
  geolocalization: {
    country: {
      code: "US",
      country: "United States of America"
    }
  }
});
