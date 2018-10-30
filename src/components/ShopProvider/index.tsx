import { ApolloClient } from "apollo-client";
import * as React from "react";

import { ShopInterface } from "../../core/types";
import { ShopContext } from "./context";
import { GET_SHOP } from "./queries";

export default class ShopProvider extends React.Component<
  { children: any; apolloClient: ApolloClient<any> },
  ShopInterface
> {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      defaultCountry: {
        code: "US",
        country: "United States of America"
      },
      geolocalization: {
        country: {
          code: "US",
          country: "United States of America"
        }
      }
    };
  }
  componentWillMount() {
    this.getShopData();
  }

  getShopData = async () => {
    const { apolloClient } = this.props;
    let data;
    const response = await apolloClient.query({
      query: GET_SHOP
    });
    data = response.data;
    this.setState(data.shop);
  };

  render() {
    const { children } = this.props;
    return (
      <ShopContext.Provider value={this.state}>{children}</ShopContext.Provider>
    );
  }
}
