import { smallScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

import * as React from "react";
import Media from "react-media";

import CostRow from "./CostRow";
import ProductRow, { EditableProductRowProps, ILine } from "./ProductRow";

import { useIntl } from "react-intl";
interface TableProps extends EditableProductRowProps {
  lines: ILine[];
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
  const intl = useIntl();

  return(
  <Media query={{ minWidth: smallScreen }}>
    {mediumScreen => (
      <table className="cart-table">
        <thead>
          <tr>
            <th> 
              {
                intl.formatMessage({
                defaultMessage: "Products",
                description: "product table th",
              })}
              </th>
            {mediumScreen && <th>
              {
                intl.formatMessage({
                defaultMessage: "Price",
                description: "price table th",
              })}
              </th>}
            <th>
              {
                intl.formatMessage({
                defaultMessage: "Variant",
                description: "variant table th",
              })}
              </th>
            <th className="cart-table__quantity-header">
              {
                intl.formatMessage({
                defaultMessage: "Quantity",
                description: "quantity table th",
              })}
            </th>
            <th colSpan={2}>{mediumScreen ? 
            intl.formatMessage({
              defaultMessage: "Total Price",
              description: "total price table th",
            }) : 
            intl.formatMessage({
              defaultMessage: "Price",
              description: "price table th",
            })}</th>
          </tr>
        </thead>
        <tbody>
          {lines.map(line => (
            <ProductRow
              key={line.id}
              line={line}
              mediumScreen={mediumScreen}
              {...rowProps}
            />
          ))}
        </tbody>
        <tfoot>
          <CostRow
            mediumScreen={mediumScreen}
            heading={intl.formatMessage({
              defaultMessage: "Subtotal",
              description: "Subtotal table t row",
            })}
            cost={subtotal}
          />
          {discount && (
            <CostRow
              mediumScreen={mediumScreen}
              heading=
              {intl.formatMessage({
                defaultMessage: "Discount: {discountName}",
                description: "Discount table t row",
              },{
                discountName,
              })}
              cost={discount}
            />
          )}
          {deliveryCost && (
            <CostRow
              mediumScreen={mediumScreen}
              heading=
              {intl.formatMessage({
                defaultMessage: "Delivery Cost",
                description: "delivery cost table t row",
              })}
              cost={deliveryCost}
            />
          )}
          {totalCost && (
            <CostRow
              mediumScreen={mediumScreen}
              heading=
              {intl.formatMessage({
                defaultMessage: "Total Cost",
                description: "total cost table t row",
              })}
              cost={totalCost}
            />
          )}
        </tfoot>
      </table>
    )}
  </Media>
)}

export default Table;
