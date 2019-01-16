import { ApolloClient } from "apollo-client";
import * as React from "react";

import { defaultContext, ShopContext } from "./context";
import { TypedGetShopQuery } from "./queries";
import { getShop_shop } from "./types/getShop";

interface ShopProviderProps {
  children: any;
  apolloClient: ApolloClient<any>;
}

interface ShopProviderState extends getShop_shop {
  fetched: boolean;
}

export default class ShopProvider extends React.Component<
  ShopProviderProps,
  ShopProviderState
> {
  state = { ...defaultContext, fetched: false };

  render() {
    return (
      <ShopContext.Provider value={this.state}>
        {!this.state.fetched && (
          <TypedGetShopQuery
            displayLoader={false}
            displayError={false}
            onCompleted={data => {
              this.setState({
                ...data.shop,
                fetched: true
              });
            }}
          />
        )}
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}
