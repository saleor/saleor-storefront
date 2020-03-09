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
}) => {
  console.log("TABLE lines, ", lines);
  return (
    <Media query={{ minWidth: smallScreen }}>
      {mediumScreen => (
        <table className="cart-table">
          <thead>
            <tr>
              <th colSpan={12}>
                <div className="cart-header">
                  <p id="product">Products</p>
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>Total Price</p>
                </div>
              </th>
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
                    sku={line.sku}
                    attributes={line.attributes}
                    processing={rowProps.processing}
                  />
                </td>
              </tr>
            ))}
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
};

export default Table;
