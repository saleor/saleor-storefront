import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { PasswordReset } from "@pages";
import { CheckoutLogin, NotFound } from "../../components";
import UserAccount, * as accountPaths from "../../userAccount/routes";
import { OrderDetails } from "../../userAccount/views";
import { Account, AccountConfirm } from "../../views/Account";
import { ArticlePage } from "../../views/Article";
import { BrowseCabinets } from "../../views/BrowseCabinets";
import { CartPage } from "../../views/Cart";
import { CategoryPage } from "../../views/Category";
import { CollectionPage } from "../../views/Collection";
import { CollectionImageSlider } from "../../views/CollectionImageSlider";
import { HomePage } from "../../views/Home";
import OrderConfirmation from "../../views/OrderConfirmation/View";
import { ProductPage } from "../../views/Product";
import { SearchPage } from "../../views/Search";

import * as paths from "./paths";


export const Routes: React.FC = () => (
  <Switch>
    <Route exact path={paths.baseUrl} component={HomePage} />
    <Route path={paths.searchUrl} component={SearchPage} />
    <Route path={paths.categoryUrl} component={CategoryPage} />
    <Route path={paths.collectionUrl} component={CollectionPage} />
    <Route path={paths.productUrl} component={ProductPage} />
    <Route path={paths.cartUrl} component={CartPage} />
    <Route path={paths.checkoutLoginUrl} component={CheckoutLogin} />
    <Route path={paths.pageUrl} component={ArticlePage} />
    <Route path={accountPaths.baseUrl} component={UserAccount} />
    <Route path={accountPaths.userOrderDetailsUrl} component={OrderDetails} />
    <Route path={paths.guestOrderDetailsUrl} component={OrderDetails} />
    <Route path={paths.orderConfirmationUrl} component={OrderConfirmation} />
    <Route path={paths.accountUrl} component={Account} />
    <Route path={paths.accountConfirmUrl} component={AccountConfirm} />
    <Route path={paths.orderHistoryUrl} component={Account} />
    <Route path={paths.addressBookUrl} component={Account} />
    <Route path={paths.paymentOptionsUrl} component={Account} />
    <Route path={paths.passwordResetUrl} component={PasswordReset} />
    <Route exact path={paths.browseCollection} component={BrowseCabinets} />
    <Route exact path={paths.cabinetCollection} component={CollectionImageSlider} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
