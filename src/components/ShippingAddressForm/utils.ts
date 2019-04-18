import { get } from "lodash";

import {
  getShop_shop_defaultCountry,
  getShop_shop_geolocalization
} from "../ShopProvider/types/getShop";
import { AddressType } from "./types";

export const getFormData = (
  geolocalization: getShop_shop_geolocalization | null,
  defaultCountry: getShop_shop_defaultCountry | null,
  data?: AddressType
) =>
  data || {
    country: {
      code: get(geolocalization, "country.code", defaultCountry.code),
      country: get(geolocalization, "country.country", defaultCountry.country)
    }
  };
