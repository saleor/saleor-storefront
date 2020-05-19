import * as React from "react";
import { Link } from "react-router-dom";

import { TaxedMoney } from "@components/containers";

import { AddressSummary, CartTable, NotFound } from "../../../components";
import { ILine } from "../../../components/CartTable/ProductRow";
import { OrderById_order, OrderById_order_lines } from "./gqlTypes/OrderById";
import {
  OrderByToken_orderByToken,
  OrderByToken_orderByToken_lines,
} from "./gqlTypes/OrderByToken";

import { orderHistoryUrl } from "../../../app/routes";

import { useIntl } from "react-intl";

const extractOrderLines = (
  lines: Array<OrderById_order_lines | OrderByToken_orderByToken_lines>
): ILine[] => {
  return lines
    .map(line => ({
      quantity: line.quantity,
      totalPrice: {
        ...line.unitPrice,
        currency: line.unitPrice.currency,
        gross: {
          amount: line.quantity * line.unitPrice.gross.amount,
          ...line.unitPrice.gross,
        },
        net: {
          amount: line.quantity * line.unitPrice.net.amount,
          ...line.unitPrice.net,
        },
      },
      ...line.variant,
      name: line.productName,
    }))
    .sort((a, b) => b.id.toLowerCase().localeCompare(a.id.toLowerCase()));
};

const Page: React.FC<{
  guest: boolean;
  order: OrderById_order | OrderByToken_orderByToken;
}> = ({ guest, order }) => {
  const intl = useIntl();

  return(order ? (
    <>
      {!guest && (
        <Link className="order-details__link" to={orderHistoryUrl}>
          {intl.formatMessage({
            defaultMessage: "Go back to Order History",
            description: "return to order history link",
          })}
        </Link>
      )}
      <h3>
        {intl.formatMessage({
          defaultMessage: "Your order nr: {number}",
          description: "order number order history",
        },
        {
          number: order.number,
        }
        )}
      </h3>
      <p className="order-details__status">
        {order.paymentStatusDisplay} / {order.statusDisplay}
      </p>
      <CartTable
        lines={extractOrderLines(order.lines)}
        totalCost={<TaxedMoney taxedMoney={order.total} />}
        deliveryCost={<TaxedMoney taxedMoney={order.shippingPrice} />}
        subtotal={<TaxedMoney taxedMoney={order.subtotal} />}
      />
      <div className="order-details__summary">
        <div>
          <h4>
          {intl.formatMessage({
            defaultMessage: "Shipping Address",
            description: "Shipping Address order history",
          })}
          </h4>
          <AddressSummary
            address={order.shippingAddress}
            email={order.userEmail}
            paragraphRef={this.shippingAddressRef}
          />
        </div>
      </div>
    </>
  ) : (
    <NotFound />
  ))}

export default Page;
