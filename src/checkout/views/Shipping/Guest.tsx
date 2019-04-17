import { get } from "lodash";
import * as React from "react";

import { ShippingAddressForm } from "../../../components";
import { FormError } from "../../../components/Form";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { maybe } from "../../../core/utils";

import { Checkout } from "../../types/Checkout";
import { createCheckout } from "../../types/createCheckout";
import { IGuestAddressProps } from "./types";
import { updateCheckoutShippingAddress } from "./types/updateCheckoutShippingAddress";

const extractShippingData = (checkout: Checkout, shop: getShop_shop) => {
  const checkoutData = { ...checkout.shippingAddress, email: checkout.email };
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

const getErrors = (
  createData: createCheckout,
  updateData: updateCheckoutShippingAddress
): FormError[] => {
  const createErrors = maybe(() => createData.checkoutCreate.errors, []);
  const updateErrors = maybe(
    () => [
      ...updateData.checkoutShippingAddressUpdate.errors,
      ...updateData.checkoutEmailUpdate.errors
    ],
    []
  );
  return [...createErrors, ...updateErrors];
};

const Guest: React.SFC<IGuestAddressProps> = ({
  checkout,
  computeCheckoutData,
  createCheckout,
  createData,
  lines,
  loading,
  shop,
  update,
  updateCheckout,
  updateData
}) => (
  <ShippingAddressForm
    data={extractShippingData(checkout, shop)}
    buttonText="Continue to Shipping"
    errors={getErrors(createData, updateData)}
    loading={loading}
    onSubmit={(evt, formData) => {
      evt.preventDefault();
      update({
        shippingAsBilling: formData.asBilling
      });
      if (!checkout) {
        createCheckout({
          variables: {
            checkoutInput: computeCheckoutData(formData, lines)
          }
        });
      } else {
        updateCheckout({
          variables: {
            checkoutId: checkout.id,
            email: formData.email,
            ...computeCheckoutData(formData)
          }
        });
      }
    }}
  />
);

export default Guest;
