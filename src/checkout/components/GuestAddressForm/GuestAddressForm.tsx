import { get } from "lodash";
import * as React from "react";

import { ShippingAddressForm } from "../../../components";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { maybe } from "../../../core/utils";
import { CheckoutFormType, IGuestAddressProps } from "../../types";
import { Checkout } from "../../types/Checkout";

const getCountryData = (shop: getShop_shop) => {
  const { geolocalization, defaultCountry } = shop;
  return {
    code: get(geolocalization, "country.code", defaultCountry.code),
    country: get(geolocalization, "country.country", defaultCountry.country)
  };
};

const extractShippingData = (checkout: Checkout | null, shop: getShop_shop) => {
  const checkoutData = checkout && {
    ...checkout.shippingAddress,
    email: checkout.email
  };
  const hasShippingCountry = !!maybe(() => checkout.shippingAddress.country);

  if (hasShippingCountry) {
    return checkoutData;
  }

  const country = getCountryData(shop);

  if (!checkout) {
    return { country };
  }

  return { ...checkoutData, country };
};

const extractBillingData = (checkout: Checkout | null, shop: getShop_shop) => {
  const address = get(checkout, "shippingAddress", null);
  const hasAddress = maybe(() => !!address.country);
  if (hasAddress) {
    return address;
  }
  return {
    ...address,
    country: getCountryData(shop)
  };
};

const extractData = (
  type: CheckoutFormType,
  checkout: Checkout,
  shop: getShop_shop
) =>
  type === "billing"
    ? extractBillingData(checkout, shop)
    : extractShippingData(checkout, shop);

const GuestAddressForm: React.SFC<IGuestAddressProps> = ({
  buttonText,
  checkout,
  errors,
  loading,
  onSubmit,
  shop,
  type = "shipping"
}) => {
  return (
    <ShippingAddressForm
      billing={type === "billing"}
      data={extractData(type, checkout, shop)}
      buttonText={buttonText}
      errors={errors}
      loading={loading}
      onSubmit={onSubmit}
    />
  );
};

export default GuestAddressForm;
