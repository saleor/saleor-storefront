import * as React from "react";
import { Route } from "react-router-dom";

import {
  AccountPage,
  CartPage,
  CategoryPage,
  CheckoutPage,
  ContentPage,
  HomePage,
  ProductPage,
  SearchPage,
  WishListPage
} from "..";

const Routes: React.SFC = () => (
  <>
    <Route exact path="/" component={HomePage} />
    <Route path="/search/" component={SearchPage} />
    <Route
      path="/category/:slug([a-z-]+)/:id([0-9]+)/"
      component={CategoryPage}
    />
    <Route
      path="/product/:slug([a-z-]+)/:id([0-9]+)/"
      component={ProductPage}
    />
    <Route path="/account/" component={AccountPage} />
    <Route path="/wish-list/" component={WishListPage} />
    <Route path="/cart/:token/" component={CartPage} />
    <Route path="/checkout/:token/" component={CheckoutPage} />
    <Route component={ContentPage} />
  </>
);

export default Routes;
