import "./scss/index.scss";

import * as React from "react";
import { useAlert } from "react-alert";

import { TaxedMoney } from "@components/containers";
import { useUserDetails } from "@sdk/react";

import { CheckoutContextInterface } from "../../checkout/context";
import { CartTable, EmptyCart, Loader } from "../../components";
import { CartInterface } from "../../components/CartProvider/context";
import { extractCheckoutLines } from "../../components/CartProvider/utils";
import { OverlayContextInterface } from "../../components/Overlay/context";
import { getShop_shop } from "../../components/ShopProvider/types/getShop";
import { maybe } from "../../core/utils";
import { TypedProductVariantsQuery } from "../Product/queries";
import { CartBasic } from "@temp/components/OverlayManager/Cart";

interface PageProps {
  checkout: CheckoutContextInterface;
  overlay: OverlayContextInterface;
  cart: CartInterface;
  shop: getShop_shop;
}

const Page: React.FC<PageProps> = ({
  shop: { geolocalization, defaultCountry },
  checkout: {
    checkout,
    loading: checkoutLoading,
    syncWithCart,
    syncUserCheckout,
  },
  cart: {
    lines,
    remove,
    add,
    errors,
    clearErrors,
    subtract,
    loading: cartLoading,
    changeQuantity,
  },
}) => {
  const alert = useAlert();
  const { data: user } = useUserDetails();
  const hasErrors: boolean | null = maybe(() => !!errors.length);
  const isLoading =
    (!checkout && checkoutLoading) || syncWithCart || syncUserCheckout;

  React.useEffect(() => {
    if (hasErrors) {
      alert.show(
        {
          content: errors.map(err => err.message).join(", "),
          title: "Error",
        },
        { type: "error" }
      );
      clearErrors();
    }
  }, [hasErrors]);

  if (isLoading) {
    return <Loader full />;
  }
  if (!lines.length) {
    return <EmptyCart />;
  }
  const productTableProps = {
    add,
    changeQuantity,
    invalid: maybe(() => !!errors.length, false),
    processing: cartLoading,
    remove,
    subtract,
  };

  const variantIds = lines.map(line => line.variantId);
  return (
    <>
      {checkout ? (
        <CartTable
          {...productTableProps}
          lines={extractCheckoutLines(checkout.lines)}
          subtotal={<TaxedMoney taxedMoney={checkout.subtotalPrice} />}
        />
      ) : (
        <TypedProductVariantsQuery
          variables={{
            ids: variantIds,
          }}
        >
          {({ data, error }) => {
            if (error) {
              return <span>There was an graphql error</span>;
            }
            return <CartBasic cartData={data} overlay={null} />;
          }}
        </TypedProductVariantsQuery>
      )}
    </>
  );
};

export default Page;
