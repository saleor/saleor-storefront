import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { priceToString } from "../../core/utils";
import { GET_CHECKOUT } from "../CheckoutPage/queries";

const CartPage: React.SFC<RouteComponentProps<{ token }>> = ({
  match: {
    params: { token = "" }
  }
}) => {
  return (
    <>
      <h1>Shopping cart</h1>
      <Query query={GET_CHECKOUT} variables={{ token }}>
        {({ loading, error, data: { checkout } }) => {
          const lines = checkout
            ? checkout.lines.edges.map(edge => edge.node)
            : [];
          if (loading) {
            return "Loading";
          }
          if (error) {
            return `Error!: ${error}`;
          }
          return (
            <table style={{ border: "1px solid black", width: "100%" }}>
              <thead>
                <tr>
                  <th colSpan={2}>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th colSpan={2}>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {lines.map(line => (
                  <tr key={line.id}>
                    <td>
                      <img width={50} src={line.variant.product.thumbnailUrl} />
                    </td>
                    <td>
                      {line.variant.product.name}
                      {line.variant.name ? `(${line.variant.name})` : null}
                    </td>
                    <td>{priceToString(line.variant.price)}</td>
                    <td>{line.quantity}</td>
                    <td>
                      {priceToString({
                        amount: line.totalPrice.gross.amount,
                        currency: line.totalPrice.currency
                      })}
                    </td>
                    <td>Remove</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4}>Subtotal</td>
                  <td colSpan={2}>
                    {checkout
                      ? priceToString({
                          amount: checkout.subtotalPrice.gross.amount,
                          currency: checkout.subtotalPrice.currency
                        })
                      : null}
                  </td>
                </tr>
              </tfoot>
            </table>
          );
        }}
      </Query>
    </>
  );
};

export default CartPage;
