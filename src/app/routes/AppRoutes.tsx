import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { CheckoutLogin, NotFound } from "../../components";
import UserAccount, {
  baseUrl as userAccountBaseUrl,
  userOrderDetailsUrl,
} from "../../userAccount/routes";
import { OrderDetails } from "../../userAccount/views";
import { Account, AccountConfirm } from "../../views/Account";
import { ArticlePage } from "../../views/Article";
import { CartPage } from "../../views/Cart";
import { CategoryPage } from "../../views/Category";
import { CollectionPage } from "../../views/Collection";
import { HomePage } from "../../views/Home";
import OrderConfirmation from "../../views/OrderConfirmation/View";
import { ProductPage } from "../../views/Product";
import { SearchPage } from "../../views/Search";

import { PasswordReset } from "../../@next/components/views";

import {
  accountConfirmUrl,
  accountUrl,
  addressBookUrl,
  baseUrl,
  cartUrl,
  categoryUrl,
  checkoutLoginUrl,
  collectionUrl,
  guestOrderDetailsUrl,
  orderConfirmationUrl,
  orderHistoryUrl,
  pageUrl,
  passwordResetUrl,
  paymentOptionsUrl,
  productUrl,
  searchUrl,
} from "./paths";

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path={baseUrl} component={HomePage} />
    <Route path={searchUrl} component={SearchPage} />
    <Route path={categoryUrl} component={CategoryPage} />
    <Route path={collectionUrl} component={CollectionPage} />
    <Route path={productUrl} component={ProductPage} />
    <Route path={cartUrl} component={CartPage} />
    <Route path={checkoutLoginUrl} component={CheckoutLogin} />
    <Route path={pageUrl} component={ArticlePage} />
    <Route path={userAccountBaseUrl} component={UserAccount} />
    <Route path={userOrderDetailsUrl} component={OrderDetails} />
    <Route path={guestOrderDetailsUrl} component={OrderDetails} />
    <Route path={orderConfirmationUrl} component={OrderConfirmation} />
    <Route path={accountUrl} component={Account} />
    <Route path={accountConfirmUrl} component={AccountConfirm} />
    <Route path={orderHistoryUrl} component={Account} />
    <Route path={addressBookUrl} component={Account} />
    <Route path={paymentOptionsUrl} component={Account} />
    <Route path={passwordResetUrl} component={PasswordReset} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
