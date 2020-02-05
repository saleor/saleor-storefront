import * as React from "react";

import { Money } from "@components/containers";

import { Checkout } from "../../../checkout/types/Checkout";
import { CartLineInterface } from "../../../components/CartProvider/context";
import { getTotal } from "../../../components/CartProvider/utils";
import { ShopContext } from "../../../components/ShopProvider/context";
import { maybe } from "../../../core/utils";
import { VariantList } from "../../../views/Product/types/VariantList";

const Subtotal: React.FC<{
  checkout: Checkout | null;
  lines: CartLineInterface[];
  variants?: VariantList;
}> = ({ checkout, lines, variants }) => (
  <ShopContext.Consumer>
    {({ defaultCountry, geolocalization }) => {
      const locale = maybe(
        () => geolocalization.country.code,
        defaultCountry.code
      );
      return (
        <div className="cart-summary__totals">
          <h5>Subtotal</h5>
          <h5>
            {checkout ? (
              <Money money={checkout.subtotalPrice.gross} />
            ) : (
              getTotal(variants, lines, locale)
            )}
          </h5>
        </div>
      );
    }}
  </ShopContext.Consumer>
);

export default Subtotal;
