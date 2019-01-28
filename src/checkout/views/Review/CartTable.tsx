import { smallScreen } from "../../../components/App/scss/variables.scss";

import * as React from "react";
import Media from "react-media";

import { CachedThumbnail } from "../../../components";
import { Checkout } from "../../types/Checkout";

const CartTable: React.FC<{ checkout: Checkout }> = ({ checkout }) => (
  <Media query={{ minWidth: smallScreen }}>
    {mediumScreen => (
      <table className="cart__table">
        <thead>
          <tr>
            <th colSpan={mediumScreen ? 1 : 2}>Products</th>
            {mediumScreen && <th>Price</th>}
            <th>Quantity</th>
            <th>{mediumScreen ? "Total Price" : "Price"}</th>
          </tr>
        </thead>
        <tbody>
          {checkout.lines.map(line => (
            <tr key={line.id}>
              <td
                className="checkout-review__content__thumbnail"
                colSpan={mediumScreen ? 1 : 2}
              >
                {mediumScreen && (
                  <CachedThumbnail source={line.variant.product} />
                )}
                {line.variant.product.name}
                {line.variant.name && line.variant.name}
              </td>
              {mediumScreen && <td>{line.variant.price.localized}</td>}
              <td>{line.quantity}</td>
              <td>{line.totalPrice.gross.localized}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="cart__table__subtotal" colSpan={3}>
              Subtotal
            </td>
            <td>{checkout.subtotalPrice.gross.localized}</td>
          </tr>
          <tr>
            <td className="cart__table__subtotal" colSpan={3}>
              Delivery cost
            </td>
            <td>+{checkout.shippingPrice.gross.localized}</td>
          </tr>
          <tr>
            <td className="cart__table__subtotal" colSpan={3}>
              Total Cost
            </td>
            <td>{checkout.totalPrice.gross.localized}</td>
          </tr>
        </tfoot>
      </table>
    )}
  </Media>
);

export default CartTable;
