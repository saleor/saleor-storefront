import { ApolloClient } from "apollo-client";
import * as React from "react";
import { Query } from "react-apollo";
import { Redirect, RouteComponentProps } from "react-router";

import { priceToString } from "../../core/utils";
import { ButtonProps, default as Button } from "../Button";
import { CartInterface } from "../CartProvider/context";
import { CREATE_CHECKOUT, GET_CHECKOUT } from "./queries";

import "./scss/index.scss";

const CheckoutPage: React.SFC<RouteComponentProps<{ token }>> = ({
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

export interface GoToCheckoutState {
  checkoutToken: string;
  loading: boolean;
  redirect: boolean;
}

export interface GoToCheckoutProps extends ButtonProps {
  children: any;
  apolloClient: ApolloClient<any>;
  cart: CartInterface;
}

export class GoToCheckout extends React.Component<
  GoToCheckoutProps,
  GoToCheckoutState
> {
  constructor(props) {
    super(props);
    let checkoutToken;
    try {
      checkoutToken = localStorage.getItem("checkout");
    } catch {
      checkoutToken = null;
    }
    this.state = {
      checkoutToken,
      loading: false,
      redirect: false
    };
  }

  handleCheckoutCreation = async () => {
    const checkoutToken = localStorage.getItem("checkout");
    const {
      apolloClient,
      cart: { lines }
    } = this.props;
    if (checkoutToken) {
      this.setState({ redirect: true, loading: false, checkoutToken });
    } else {
      this.setState({ loading: true });
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CHECKOUT,
        variables: { checkoutInput: { lines } }
      });
      this.setState({
        checkoutToken: data.checkoutCreate.checkout.token,
        loading: false,
        redirect: true
      });
    }
  };

  getRedirection() {
    return <Redirect to={`/checkout/${this.state.checkoutToken}/`} />;
  }

  componentDidUpdate(prevProps, prevState) {
    const { checkoutToken } = this.state;
    if (checkoutToken) {
      localStorage.setItem("checkout", this.state.checkoutToken);
    } else {
      localStorage.removeItem("checkout");
    }
  }

  render = () => {
    const { children, cart, apolloClient, ...buttonProps } = this.props;
    if (this.state.loading) {
      return <Button {...buttonProps}>Loading</Button>;
    }
    if (this.state.checkoutToken && this.state.redirect) {
      this.setState({ redirect: false });
      return this.getRedirection();
    }
    return (
      <Button
        {...buttonProps}
        onClick={event => {
          this.handleCheckoutCreation();
          event.preventDefault();
        }}
      >
        {children}
      </Button>
    );
  };
}

export default CheckoutPage;
