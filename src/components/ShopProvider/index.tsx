import { ApolloClient } from "apollo-client";
import * as React from "react";

import { defaultCountry, ShopContext } from "./context";
import { TypedGetShopQuery } from "./queries";
import { getShop_shop } from "./types/getShop";

interface ShopProviderProps {
  children: any;
  apolloClient: ApolloClient<any>;
}

interface ShopProviderState extends getShop_shop {
  fetched: boolean;
}

export default class ShopProvider extends React.PureComponent<
  ShopProviderProps,
  ShopProviderState
> {
  state = {
    countries: [],
    defaultCountry,
    fetched: false,
    geolocalization: { country: defaultCountry }
  };

  render() {
    return (
      <ShopContext.Provider value={this.state}>
        <TypedGetShopQuery
          displayLoader={false}
          displayError={false}
          onCompleted={data => {
            this.setState({ ...data.shop, fetched: true });
          }}
          skip={this.state.fetched}
        />
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}
