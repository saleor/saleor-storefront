import { smallScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

import * as React from "react";
import Media from "react-media";

import CostRow from "./CostRow";
import { EditableProductRowProps, LineI } from "./ProductRow";

import { CartRow } from "@components/organisms";
import { TaxedMoney } from "../../@next/components/containers";

interface TableProps extends EditableProductRowProps {
  lines: LineI[];
  subtotal: React.ReactNode;
  deliveryCost?: React.ReactNode;
  totalCost?: React.ReactNode;
  discount?: React.ReactNode;
  discountName?: string;
}

const Table: React.FC<TableProps> = ({
  subtotal,
  deliveryCost,
  totalCost,
  discount,
  discountName,
  lines,
  ...rowProps
}) => (
  <Media query={{ minWidth: smallScreen }}>
    {mediumScreen => (
      <table className="cart-table">
        <thead>
          <tr>
            <th>Products</th>
            {mediumScreen && <th>Price</th>}
            <th>Size</th>
            <th className="cart-table__quantity-header">Quantity</th>
            <th colSpan={2}>{mediumScreen ? "Total Price" : "Price"}</th>
          </tr>
        </thead>
        <tbody>
          {lines.map(line => (
            <tr>
              <td colSpan={12}>
                <CartRow
                  onSubstract={() => rowProps.subtract(line.id)}
                  onAdd={() => rowProps.add(line.id)}
                  onRemove={() => rowProps.remove(line.id)}
                  totalPrice={<TaxedMoney taxedMoney={line.totalPrice} />}
                  unitPrice={<TaxedMoney taxedMoney={line.pricing.price} />}
                  name={line.product.name}
                  quantity={line.quantity}
                  thumbnail={line.product.thumbnail}
                />
              </td>
            </tr>
          ))}
          {/* {lines.map(line => (
            <ProductRow
              key={line.id}
              line={line}
              mediumScreen={mediumScreen}
              {...rowProps}
            />
          ))} */}
        </tbody>
        <tfoot>
          <CostRow
            mediumScreen={mediumScreen}
            heading="Subtotal"
            cost={subtotal}
          />
          {discount && (
            <CostRow
              mediumScreen={mediumScreen}
              heading={`Discount: ${discountName}`}
              cost={discount}
            />
          )}
          {deliveryCost && (
            <CostRow
              mediumScreen={mediumScreen}
              heading="Delivery Cost"
              cost={deliveryCost}
            />
          )}
          {totalCost && (
            <CostRow
              mediumScreen={mediumScreen}
              heading="Total Cost"
              cost={totalCost}
            />
          )}
        </tfoot>
      </table>
    )}
  </Media>
);

export default Table;
