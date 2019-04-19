import { get } from "lodash";
import * as React from "react";

import { ShippingAddressForm } from "../../../components";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { maybe } from "../../../core/utils";
import { IGuestAddressProps } from "../../types";
import { Checkout } from "../../types/Checkout";

const extractShippingData = (checkout: Checkout, shop: getShop_shop) => {
  const checkoutData = checkout && {
    ...checkout.shippingAddress,
    email: checkout.email
  };
  const hasShippingCountry = !!maybe(() => checkout.shippingAddress.country);

  if (hasShippingCountry) {
    return checkoutData;
  }

  const { geolocalization, defaultCountry } = shop;
  const country = {
    code: get(geolocalization, "country.code", defaultCountry.code),
    country: get(geolocalization, "country.country", defaultCountry.country)
  };

  if (!checkout) {
    return { country };
  }

  return { ...checkoutData, country };
};

const Guest: React.SFC<IGuestAddressProps> = ({
  checkout,
  checkoutCreateUpdateErrors,
  loading,
  onSubmit,
  shop
}) => (
  <ShippingAddressForm
    data={extractShippingData(checkout, shop)}
    buttonText="Continue to Shipping"
    errors={checkoutCreateUpdateErrors}
    loading={loading}
    onSubmit={onSubmit}
  />
);

export default Guest;
