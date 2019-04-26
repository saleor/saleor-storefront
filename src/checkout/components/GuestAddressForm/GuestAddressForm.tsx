import * as React from "react";

import { ShippingAddressForm } from "../../../components";
import { FormAddressType } from "../../../components/ShippingAddressForm/types";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { maybe } from "../../../core/utils";
import { CheckoutFormType, IGuestAddressProps } from "../../types";
import { Checkout } from "../../types/Checkout";

const getCountryData = (shop: getShop_shop) => {
  const { geolocalization, defaultCountry } = shop;
  return {
    code: maybe(() => geolocalization.country.code, defaultCountry.code),
    country: maybe(
      () => geolocalization.country.country,
      defaultCountry.country
    )
  };
};

const extractShippingData = (checkout: Checkout | null, shop: getShop_shop) => {
  const country = getCountryData(shop);
  if (!checkout) {
    return { country };
  }

  const checkoutData = checkout && {
    ...checkout.shippingAddress,
    email: checkout.email
  };

  const hasShippingCountry = !!maybe(() => checkout.shippingAddress.country);
  if (hasShippingCountry) {
    return checkoutData;
  }

  return { ...checkoutData, country };
};

const extractBillingData = (checkout: Checkout | null, shop: getShop_shop) => {
  const address = maybe(() => checkout.shippingAddress, null);
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

const onSubmitHandler = ({
  errors,
  onSubmit,
  proceedToNextStep
}: any) => async (data: FormAddressType) => {
  await onSubmit(data);
  if (!errors.length) {
    proceedToNextStep();
  }
};

const GuestAddressForm: React.SFC<IGuestAddressProps> = ({
  buttonText,
  checkout,
  errors,
  loading,
  onSubmit,
  proceedToNextStep,
  shop,
  type = "shipping"
}) => {
  return (
    <ShippingAddressForm
      billing={type === "billing"}
      data={extractData(type as CheckoutFormType, checkout, shop)}
      buttonText={buttonText}
      errors={errors}
      loading={loading}
      onSubmit={onSubmitHandler({ errors, onSubmit, proceedToNextStep })}
    />
  );
};

export default GuestAddressForm;
