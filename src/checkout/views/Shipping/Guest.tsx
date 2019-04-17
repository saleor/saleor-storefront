import { get, omit } from "lodash";
import * as React from "react";
import { MutationFn } from "react-apollo";

import { FormAddressType, ShippingAddressForm } from "../../../components";
import { FormError } from "../../../components/Form";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { maybe } from "../../../core/utils";

import { CartLineInterface } from "../../../components/CartProvider/context";
import { CheckoutContextInterface } from "../../context";
import { Checkout } from "../../types/Checkout";
import { createCheckout } from "../../types/createCheckout";
import { updateCheckoutShippingAddress } from "./types/updateCheckoutShippingAddress";

interface IGuest {
  checkout: Checkout;
  createCheckout: MutationFn;
  createData: createCheckout;
  lines: CartLineInterface[];
  loading: boolean;
  shop: getShop_shop;
  updateCheckout: MutationFn;
  update?: (checkoutData: CheckoutContextInterface) => Promise<void>;
  updateData: updateCheckoutShippingAddress;
}

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

const computeCheckoutData = (
  data: FormAddressType,
  lines?: CartLineInterface[]
) => ({
  email: data.email,
  shippingAddress: {
    ...omit(data, ["email", "country"]),
    country: data.country.value || data.country.code
  },
  ...(lines && {
    lines: lines.map(({ quantity, variantId }) => ({
      quantity,
      variantId
    }))
  })
});

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

const Guest: React.SFC<IGuest> = ({
  checkout,
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
