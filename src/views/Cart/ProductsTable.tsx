import { smallScreen } from "../../components/App/scss/variables.scss";

import * as React from "react";
import Media from "react-media";

import ProductRow, { LineI } from "./ProductRow";

const ProductsTable: React.SFC<{
  subtotal: string;
  processing: boolean;
  invalid: boolean;
  lines: LineI[];
  add(variantId: string): void;
  changeQuantity(variantId: string, quantity: number): void;
  remove(variantId: string): void;
  subtract(variantId: string): void;
}> = ({
  add,
  changeQuantity,
  invalid,
  processing,
  remove,
  subtract,
  subtotal,
  lines
}) => {
  return (
    <Media query={{ minWidth: smallScreen }}>
      {mediumScreen => (
        <table className="cart-page__table">
          <thead>
            <tr>
              <th>Products</th>
              {mediumScreen && <th>Price</th>}
              <th className="cart-page__table__quantity-header">Quantity</th>
              <th colSpan={2}>{mediumScreen ? "Total Price" : "Price"}</th>
            </tr>
          </thead>
          <tbody>
            {lines
              .sort((a, b) =>
                b.id.toLowerCase().localeCompare(a.id.toLowerCase())
              )
              .map(line => (
                <ProductRow
                  key={line.id}
                  line={line}
                  add={add}
                  changeQuantity={changeQuantity}
                  invalid={invalid}
                  mediumScreen={mediumScreen}
                  processing={processing}
                  remove={remove}
                  subtract={subtract}
                />
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={mediumScreen ? 3 : 2}
                className="cart-page__table__subtotal"
              >
                Subtotal
              </td>
              <td colSpan={2}>{subtotal}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </Media>
  );
};

export default ProductsTable;
